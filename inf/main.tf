terraform {
  backend "s3" {
    bucket = "upwardli-terraform-state"
    // Everything under main until we have tf modules
    key            = "main/terraform.tfstate"
    region         = "us-east-2"
    dynamodb_table = "terraform-lock"
  }
}

variable "region" {
  default = "us-east-2"
}

variable "environment" {
  default = "dev"
}

provider "aws" {
  region = var.region
}

module "vpc" {
  source = "terraform-aws-modules/vpc/aws"

  name = "${var.environment}-upwardli-vpc"
  cidr = "10.0.0.0/16"

  azs              = ["us-east-2a", "us-east-2b", "us-east-2c"]
  private_subnets  = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
  public_subnets   = ["10.0.101.0/24", "10.0.102.0/24", "10.0.103.0/24"]
  database_subnets = ["10.0.201.0/24", "10.0.202.0/24", "10.0.203.0/24"]

  enable_nat_gateway     = true
  single_nat_gateway     = true
  one_nat_gateway_per_az = false

  create_database_subnet_group = true

  tags = {
    Terraform   = "true"
    Environment = var.environment
  }
}

module "db_security_group" {
  source  = "terraform-aws-modules/security-group/aws"
  version = "~> 4"

  name        = "core-mysql"
  description = "MySQL security group"
  vpc_id      = module.vpc.vpc_id

  # ingress
  ingress_with_cidr_blocks = [
    {
      from_port   = 3306
      to_port     = 3306
      protocol    = "tcp"
      description = "MySQL access from within VPC"
      cidr_blocks = module.vpc.vpc_cidr_block
    },
  ]

  tags = {
    Terraform   = "true"
    Environment = var.environment
  }
}

module "db_core" {
  source = "terraform-aws-modules/rds/aws"

  identifier = "coredb"

  create_db_option_group    = false
  create_db_parameter_group = false

  # All available versions: http://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_MySQL.html#MySQL.Concepts.VersionMgmt
  engine               = "mysql"
  engine_version       = "5.7"
  family               = "mysql5.7" # DB parameter group
  major_engine_version = "5.7"      # DB option group
  instance_class       = "db.t3.micro"

  iam_database_authentication_enabled = true

  allocated_storage = 20

  name                   = "coredb"
  username               = "core_root"
  create_random_password = true
  random_password_length = 12
  port                   = 3306

  subnet_ids             = module.vpc.database_subnets
  vpc_security_group_ids = [module.db_security_group.security_group_id]

  maintenance_window = "Mon:00:00-Mon:03:00"
  backup_window      = "03:00-06:00"

  backup_retention_period = 0

  tags = {
    Terraform   = "true"
    Environment = var.environment
  }
}

module "api_gateway_core" {
  source = "terraform-aws-modules/apigateway-v2/aws"

  name          = "${var.environment}-core-http"
  description   = "Proxy API Gateway for ${var.environment} Core"
  protocol_type = "HTTP"

  create_api_domain_name = false

  cors_configuration = {
    allow_headers = ["content-type", "x-amz-date", "authorization", "x-api-key", "x-amz-security-token", "x-amz-user-agent"]
    allow_methods = ["*"]
    allow_origins = ["*"]
  }

  integrations = {
    "ANY /" = {
      lambda_arn             = module.lambda_core.lambda_function_arn
      payload_format_version = "2.0"
      timeout_milliseconds   = 12000
    }

    "$default" = {
      lambda_arn = module.lambda_core.lambda_function_arn
    }
  }
}

module "lambda_core" {
  source = "terraform-aws-modules/lambda/aws"

  function_name = "core-${var.environment}"
  description   = "backend/core Lambda"

  create_package = false
  package_type   = "Image"

  // placeholder - required but will be overrided on each deploy
  image_uri                = "490799294904.dkr.ecr.us-east-2.amazonaws.com/core:latest"
  image_config_entry_point = ["/usr/bin/python", "-m", "awslambdaric"]

  vpc_subnet_ids         = module.vpc.public_subnets
  vpc_security_group_ids = [module.vpc.default_security_group_id]
  attach_network_policy  = true
  publish                = true

  allowed_triggers = {
    AllowExecutionFromAPIGateway = {
      service    = "apigateway"
      source_arn = "${module.api_gateway_core.apigatewayv2_api_execution_arn}/*/*/*"
    }
  }
}

# ECR repositories - core
resource "aws_ecr_repository" "core" {
  name = "core-${var.environment}"
}

resource "aws_iam_user" "github-actions-core" {
  name = "github-actions-core-user-${var.environment}"
}

resource "aws_iam_access_key" "github-actions-core-access-key-v1" {
  user = aws_iam_user.github-actions-core.name
}

data "aws_iam_policy_document" "github-actions-core-user-document" {
  version = "2012-10-17"
  statement {
    effect = "Allow"

    actions = [
      "ecr:GetDownloadUrlForLayer",
      "ecr:BatchGetImage",
      "ecr:BatchCheckLayerAvailability",
      "ecr:PutImage",
      "ecr:InitiateLayerUpload",
      "ecr:UploadLayerPart",
      "ecr:CompleteLayerUpload",
      "ecr:GetRepositoryPolicy",
      "ecr:SetRepositoryPolicy",
      "lambda:UpdateFunctionCode"
    ]

    resources = [
      aws_ecr_repository.core.arn,
      module.lambda_core.lambda_function_arn
    ]
  }

  statement {
    effect = "Allow"

    actions = [
      "ecr:GetAuthorizationToken"
    ]
    resources = [
      "*"
    ]
  }
}

resource "aws_iam_policy" "github-actions-core-user-policy" {
  name        = "github-actions-core-user-policy-${var.environment}"
  description = "ECR push & lambda update GitHub actions user"
  policy      = data.aws_iam_policy_document.github-actions-core-user-document.json
}

resource "aws_iam_user_policy_attachment" "github-actions-core-user-policy-attach" {
  user       = aws_iam_user.github-actions-core.name
  policy_arn = aws_iam_policy.github-actions-core-user-policy.arn
}


output "access_key_id_v1" {
  value = aws_iam_access_key.github-actions-core-access-key-v1.id
}

output "secret_access_key_id_v1" {
  value     = aws_iam_access_key.github-actions-core-access-key-v1.secret
  sensitive = true
}

# Steps to test github actions locally
## Install act cli
Install `act` from https://github.com/nektos/act

## Create a local file with secrets
I created the following file `~/.aws/github_builder_secret` with credential for github aws account. For dev, it would be `github-actions-core-user-dev`
```
IAM_CORE_DEPLOY_ID_DEV={aws access key}
IAM_CORE_DEPLOY_SECRET_DEV={aws secret key}
```

## Create base docker image that mimics github runtime environment
Create an image locally with the following docker file

`Dockerfile`
```
FROM nektos/act-environments-ubuntu:18.04

RUN pip install awscli
```

Then run the following to create test environment locally.
`docker build -t act-local-ubuntu .`

## Example 
To test the build/image upload,
`act -j backend-container-build --secret-file ~/.aws/github_builder_secret -P ubuntu-latest=act-local-ubuntu:latest`


To test deployment,
`act -j backend-container-deploy --secret-file ~/.aws/github_builder_secret -P ubuntu-latest=act-local-ubuntu:latest`
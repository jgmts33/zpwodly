FROM ubuntu:20.04

ENV DEBIAN_FRONTEND=noninteractive

RUN mkdir -p /app
ENV PYTHONPATH "${PYTHONPATH}:/app"
WORKDIR /app

RUN apt-get update -q

# wait-for-it for development docker-compose
RUN apt-get install wait-for-it

# python dependencies
RUN apt-get install -y build-essential python3-dev python3-pip python-is-python3
RUN apt-get install -y libmysqlclient-dev mysql-client

# Install apig-wsgi for lambda bridge
RUN pip install awslambdaric apig-wsgi

# Setup vscode user for development
ARG DEV_UID=1000
ARG DEV_USERNAME=vscode
RUN groupadd --gid $DEV_UID $DEV_USERNAME
RUN useradd --uid $DEV_UID --gid $DEV_UID -m $DEV_USERNAME


COPY requirements.txt .
RUN pip install -r requirements.txt

COPY manage.py .
COPY config config/
COPY guides guides/

# Set via Terraform: ENTRYPOINT [ "/usr/bin/python", "-m", "awslambdaric" ]
CMD [ "config.wsgi.apig_wsgi_handler" ]

FROM node:14-alpine

RUN mkdir /app
WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm i

FROM node:14-alpine

WORKDIR /app

ADD package.json package.json

RUN npm i -g @nestjs/cli

RUN npm install

COPY . .

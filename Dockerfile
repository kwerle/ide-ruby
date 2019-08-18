FROM node:10

WORKDIR /source

COPY . .

RUN yarn

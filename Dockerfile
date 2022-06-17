FROM node:18

WORKDIR /source

COPY . .

RUN yarn

FROM node:17-alpine AS builder
WORKDIR /usr/src/game-backend
COPY package*.json ./
RUN npm install

COPY . .

#RUN apk add --update python3-dev build-base # for gyp


ENTRYPOINT [ "npm", "run", "start:prod" ]


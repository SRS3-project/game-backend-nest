FROM node:17-alpine AS builder
WORKDIR /usr/src/game-backend

COPY ./usr .

#RUN apk add --update python3-dev build-base # for gyp
RUN npm install

ENTRYPOINT [ "npm", "run", "start:prod" ]


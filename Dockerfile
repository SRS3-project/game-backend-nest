FROM node:17-alpine AS builder
WORKDIR /usr/src/game-backend

COPY . .

#RUN apk add --update python3-dev build-base # for gyp
RUN npm ci
RUN npm run build

ENTRYPOINT [ "npm", "run","start:prod" ]



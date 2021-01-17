FROM node:15.5.1-alpine3.12 As dev

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./
RUN yarn

COPY . .
COPY babel.config.js ./src/client/

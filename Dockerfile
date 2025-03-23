FROM node:20.17.0-alpine AS base

RUN apk add --no-cache curl bash

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn graphql-codegen --config graphql.config.ts

RUN yarn run build

EXPOSE 3000

CMD ["yarn", "run", "start"]

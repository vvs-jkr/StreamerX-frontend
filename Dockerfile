FROM node:20.17.0-alpine AS base

RUN apk add --no-cache curl bash

RUN curl -fsSL https://bun.sh/install | bash

ENV PATH="/root/.bun/bin:$PATH"

WORKDIR /app

COPY package.json bun.lockb ./

RUN bun install

COPY . .

RUN bun graphql-codegen --config graphql.config.ts

RUN bun run build

EXPOSE 3000

CMD ["bun", "run", "start"]

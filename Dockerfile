FROM node:16

WORKDIR /api

COPY package.json /api

RUN yarn

RUN npx prisma generate

COPY . /api
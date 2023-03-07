FROM node:lts-alpine

RUN mkdir /app
WORKDIR /app
COPY package*.json ./
RUN npm i --legacy-peer-deps

COPY  . .
CMD npm start
COPY .env .env
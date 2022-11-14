FROM node:lts-alpine

RUN mkdir /app
WORKDIR /app
COPY package*.json ./
RUN npm i -g pnpm
COPY tsconfig.json tsconfig.json
COPY tailwind.config.js tailwind.config.js
COPY src src
CMD npm start

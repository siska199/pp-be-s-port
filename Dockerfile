FROM node:20-alpine

WORKDIR /kyuuchan199/s-port/server

COPY package.json .

RUN npm install

COPY . .

RUN npx prisma generate


EXPOSE 5000

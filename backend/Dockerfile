FROM node:16

WORKDIR /app

COPY package*.json ./

RUN yarn install --silent

COPY . ./

EXPOSE 7000

CMD ["node", "server.js"]

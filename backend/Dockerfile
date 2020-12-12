FROM node:13

WORKDIR /app

COPY package*.json ./

RUN npm install --silent

COPY . ./

EXPOSE 7000

CMD ["node", "server.js"]

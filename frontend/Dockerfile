FROM node:18

WORKDIR /app

COPY package*.json ./

RUN yarn install --silent

COPY . ./

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "dev"]

FROM node:18-alpine

WORKDIR /indexer-be
COPY package*.json ./
RUN npm install
COPY . .
CMD [ "npm", "run", "start" ]

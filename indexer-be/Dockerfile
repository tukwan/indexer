FROM node:18

WORKDIR /indexer-be
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 1234
CMD [ "npm", "run", "start" ]

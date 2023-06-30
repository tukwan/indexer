FROM node:18

WORKDIR /graphql-api
COPY package.json ./
RUN npm install
COPY . .
RUN npm run generate
EXPOSE 4000

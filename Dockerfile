# syntax=docker/dockerfile:1

FROM node:12.18.1

# Create app directory
WORKDIR .

# Install app dependencies
COPY package.json .

RUN npm install

COPY . .

EXPOSE 4000
CMD [ "node", "index.js" ]
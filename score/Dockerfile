FROM node:12.18.1 as score-api

# Create app directory
WORKDIR .

# Install app dependencies
COPY package*.json .
RUN npm install

COPY . .

EXPOSE 4500
CMD [ "node", "score.js" ]
FROM node:lts

WORKDIR /api
COPY package.json .
RUN npm install
COPY . .
CMD [ "node", "index.js" ]
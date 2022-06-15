# stage1 as builder
FROM node:10-alpine as builder

# copy the package.json to install dependencies
COPY package.json package-lock.json ./

# Install the dependencies and make the folder
RUN npm install && mkdir /todo-app-ui && mv ./node_modules ./todo-app-ui

WORKDIR /todo-app-ui

COPY . .

# Build the project and copy the files
RUN npm run build


FROM nginx:alpine

#!/bin/sh

COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf

## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy from the stahg 1
COPY --from=builder /todo-app-ui/build /usr/share/nginx/html

EXPOSE 3001 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
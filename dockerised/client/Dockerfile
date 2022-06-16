FROM node:13.12.0-alpine as builder

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

FROM nginx:1.21.6
COPY ./nginx.conf /etc/nginx/nginx.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
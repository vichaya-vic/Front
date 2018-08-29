FROM node:9.11.1-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM nginx:1.13.12-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html/dist
COPY ./index.html /usr/share/nginx/html/index.html
COPY ./server.conf /etc/nginx/conf.d/server.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

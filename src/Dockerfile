# Stage 1: Build the Nuxt app
FROM node:18-alpine as builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run generate

# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY --from=builder /usr/src/app/.output/public /var/www
COPY ./docker-configs/nginx/default.conf /etc/nginx/conf.d/default.conf

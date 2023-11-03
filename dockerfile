# Build stage
FROM node:lts-alpine AS build
WORKDIR /asap-frontend
COPY package*.json ./
RUN npm install
RUN npm i daisyui
RUN npm install @feathersjs/socketio-client --save
COPY . .
RUN npm run generate

# Production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build /asap-frontend/.output/public /usr/share/nginx/html
EXPOSE 80

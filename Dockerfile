FROM node:14-alpine as build
 WORKDIR /angular-material

COPY . /angular-material

RUN npm install

RUN npm run build
FROM nginx:latest

COPY --from=build /angular-material/dist/angular-material /usr/share/nginx/html


EXPOSE 80

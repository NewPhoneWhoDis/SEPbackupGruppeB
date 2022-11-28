FROM node:16-alpine AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install -g @angular/cli
COPY . .
ENV PORT=4200
EXPOSE 4200
CMD ["ng", "serve", "--host=0.0.0.0"]
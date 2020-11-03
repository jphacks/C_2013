FROM node:14.5.0

WORKDIR /app

COPY ./package.json /app
COPY ./package-lock.json /app

RUN yarn install
COPY . .

EXPOSE 3000

ENTRYPOINT [ "npm", "start" ]
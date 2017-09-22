FROM node:8
RUN yarn global add nodemon sequelize-cli

WORKDIR /app

ENTRYPOINT nodemon --inspect="0.0.0.0:9229" /app/src/index.js

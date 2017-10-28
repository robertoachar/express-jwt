FROM node:latest

LABEL maintainer="robertoachar@gmail.com"

WORKDIR /usr/src/app

RUN npm install -g nodemon

VOLUME [ "/usr/src/app" ]

ENV NODE_ENV=development
ENV PORT=3000
ENV JWT_SECRET=secret

EXPOSE 3000

CMD [ "nodemon", "-L", "src/index.js" ]

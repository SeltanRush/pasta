FROM node:12

WORKDIR /usr/src/app

COPY . .
RUN npm install

EXPOSE $PORT
CMD ["npm", "run", "start:prod"]
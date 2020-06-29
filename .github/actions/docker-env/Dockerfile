FROM node:12-alpine

COPY .github/actions/docker-env/* ./

RUN npm install

CMD [ "node", "main.js" ]
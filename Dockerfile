FROM node:12.13.0-alpine

ARG NODE_ENV=development
ARG PORT=3000
ENV NODE_ENV=${NODE_ENV}
ENV PORT=${PORT}

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn*.lock ./
RUN yarn

COPY lib /usr/src/app/lib

EXPOSE ${PORT}

CMD [ "yarn", "run", "start:prod" ]
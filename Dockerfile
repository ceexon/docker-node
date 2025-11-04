FROM node:lts-jod

WORKDIR /app

COPY package.json .

RUN npm i

RUN if [ "$NODE_ENV" = "development" ]; \
        then npm i; \
        else npm i --only=production; \
        fi

COPY . .

EXPOSE $PORT

CMD ["node", "index.js"]

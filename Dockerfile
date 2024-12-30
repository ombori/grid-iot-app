FROM node:20-alpine AS pre-build
COPY package*.json ./

FROM node:20-alpine

WORKDIR /app/

COPY --from=pre-build package*.json ./

RUN yarn install

COPY dist ./

CMD ["node", "app.js"]

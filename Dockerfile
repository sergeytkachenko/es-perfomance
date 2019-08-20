FROM node

WORKDIR /app
COPY . .

RUN npm install

ENTRYPOINT ["node", "src/index.js"]

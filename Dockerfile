FROM node
COPY . .

ENTRYPOINT ["node", "src/index.js"]

FROM node:22-bookworm
WORKDIR /parqueadero-api
COPY package.json .
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm","run","start"]

FROM node:23-slim

WORKDIR /fronend

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm","run","preview"]
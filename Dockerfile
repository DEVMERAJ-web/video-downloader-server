FROM node:18

RUN apt update && apt install -y yt-dlp

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8080

CMD ["node","server.js"]

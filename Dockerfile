FROM node:18

RUN apt update && apt install -y yt-dlp

WORKDIR /app

COPY . .

RUN npm install

CMD ["node","server.js"]

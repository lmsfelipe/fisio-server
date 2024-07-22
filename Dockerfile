FROM node:21

RUN mkdir -p /app
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . /app

EXPOSE 8080

CMD ["npm", "start"]

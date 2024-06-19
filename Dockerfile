FROM node:21

RUN mkdir -p /app
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . /app

EXPOSE 3000

CMD ["npm", "start"]

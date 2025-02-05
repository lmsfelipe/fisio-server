FROM node:21

RUN mkdir -p /app
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . /app

RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "dev"]

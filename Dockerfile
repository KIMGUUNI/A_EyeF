FROM node:20-alpine
RUN mkdir /app
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --force
COPY . .
CMD ["npm","run","start"]

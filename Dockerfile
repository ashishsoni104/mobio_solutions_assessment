FROM node:21 AS development
 
WORKDIR /usr/src/app
 
COPY package*.json ./
 
RUN npm install
 
COPY . .
 
EXPOSE 3000
 
CMD [ "npm", "start" ]

FROM development AS app-dev
FROM node:20.11.0
#
## Set working directory for the React application
WORKDIR ./client
#
## Copy package.json and package-lock.json to the container
COPY package*.json ./
#
## Install Node.js dependencies
RUN npm install
#
## Copy the entire React application to the container
COPY . .

EXPOSE 3001
#
## Build the React app
RUN npm run build


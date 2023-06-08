FROM node:16-alpine as build
# Set the working directory to /app inside the container
WORKDIR /app
# Copy app files
COPY . .
#Cringe
RUN npm install -g npm@9.7.1
# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN npm install
# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the app dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . /app

# Expose the port on which your app will run
EXPOSE 3000

# Run Sequelize migration to create database tables
RUN npx sequelize-cli db:migrate

# Set the command to run your app using Node.js
CMD [ "node", "index.js" ]

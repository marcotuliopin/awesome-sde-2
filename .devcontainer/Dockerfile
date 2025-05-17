# Use the official Node.js image as a parent image
FROM node:20.15.1

# Set the working directory
WORKDIR /usr/src/app

COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
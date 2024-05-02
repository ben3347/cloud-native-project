# Use the official Node.js image as the base image
FROM node:18-bullseye-slim

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the Node.js dependencies
RUN npm ci --only=production

# Copy the rest of the application code
COPY . .

# Expose the port the app will run on
EXPOSE 4000

# Start the Node.js application
CMD ["node", "server.js"]
# Use a Node.js 16 base image 
FROM node:16

# Set the working directory in the container 
WORKDIR /app

# Copy package.json and package-lock.json before other files 
# Utilize Docker cache to skip node_modules install if unchanged 
COPY package*.json .

# Install dependencies 
RUN npm install --production

COPY *.js .
COPY movieDB.json .

EXPOSE 3000
CMD ["node", "server.js"]
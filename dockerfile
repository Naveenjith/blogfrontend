# Use an official Node.js runtime as a base image
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the project files into the container
COPY . .

# Build the React app for production
RUN npm run build

# Use an official Nginx image to serve the built app
FROM nginx:stable-alpine

# Copy the built files from the previous stage to Nginx's default html directory
COPY --from=0 /app/build /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start Nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]
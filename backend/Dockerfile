# Use Node.js 20
FROM node:20

# Set working directory
WORKDIR /usr/src/app


COPY package*.json ./
RUN npm install

# Copy the rest of the backend source code
COPY . .

# Expose the port (adjust if different)
EXPOSE 5000

# Start the backend server
CMD ["npm", "start"]

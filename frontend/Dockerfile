# Use Node.js 20
FROM node:20

# Set working directory
WORKDIR /usr/src/app

# Copy and install dependencies
COPY package*.json ./
RUN npm install

# Copy app source code
COPY . .

# Expose the Vite/React dev port
EXPOSE 5173

# Run the frontend in dev mode (use `npm run build` for production)
CMD ["npm", "run", "dev", "--", "--host"]

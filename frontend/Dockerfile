# Build Stage
FROM node:20 AS build-stage

WORKDIR /app

# Copy package.json & package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build Angular app
RUN npm run build --prod

# Production Stage
FROM node:20-alpine

WORKDIR /app

# Install http-server globally
RUN npm install -g http-server

# Copy built Angular files
COPY --from=build-stage /app/dist/frontend/browser .

# Expose port
EXPOSE 8088

# Start the server with fallback to index.html for Angular routing
CMD ["http-server", ".", "-p", "8088", "-P", "http://127.0.0.1:8088?"]
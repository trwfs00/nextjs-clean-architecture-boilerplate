# Use official Node.js runtime as base image
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Expose ports for the app and Storybook
EXPOSE 3000 6006

# Default command to run Next.js
CMD ["npm", "run", "dev"]

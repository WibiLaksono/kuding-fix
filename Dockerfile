# Frontend Dockerfile (Root directory)
FROM node:18-alpine

WORKDIR /app

# Install necessary packages
RUN apk add --no-cache curl libc6-compat

# Copy package files first for optimal caching
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy Next.js configuration files
COPY next.config.* ./
COPY tailwind.config.* ./
COPY postcss.config.* ./
COPY components.json ./
COPY eslint.config.mjs ./
COPY jest.config.js ./
COPY jest.setup.js ./
COPY jsconfig.json ./

# Copy source directories (based on your project structure)
COPY app ./app
COPY lib ./lib  
COPY public ./public
COPY docs ./docs

# Set environment variables
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Build the application
RUN npm run build

# Expose port
EXPOSE 3000

# Health check
# Start the application
CMD ["npm", "start"]
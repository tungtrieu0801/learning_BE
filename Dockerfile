# 1. Build stage
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package.json trước để cache layer
COPY package*.json ./
RUN npm install

# Copy toàn bộ source code
COPY . .

# Build NestJS (ra thư mục dist/)
RUN npm run build

# 2. Run stage (production)
FROM node:20-alpine
WORKDIR /app

# Copy package.json để cài deps production
COPY package*.json ./
RUN npm install --only=production

# Copy dist đã build từ stage trước
COPY --from=builder /app/dist ./dist

# Nếu cần .env có thể COPY luôn
# COPY .env ./

EXPOSE 3000

CMD ["node", "dist/main.js"]

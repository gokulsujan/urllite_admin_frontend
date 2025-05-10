# Stage 1: Build
FROM node:18 AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN npm audit fix

# Stage 2: Serve static files
FROM node:18-slim

WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/dist ./dist

ENV PORT=3001
EXPOSE 3001

CMD ["serve", "-s", "dist", "-l", "3001"]

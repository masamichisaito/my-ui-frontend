# --- build ステージ（Viteなど）
FROM node:18-alpine AS builder
WORKDIR /app

# --- Gitが必要な場合
RUN apk add --no-cache git

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# --- 本番ステージ（Nginxで配信）
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

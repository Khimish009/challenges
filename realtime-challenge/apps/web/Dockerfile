# СТАДИЯ 1: Обрезка монорепы (Prune)
FROM node:20-alpine AS builder
RUN apk add --no-cache libc6-compat
# Устанавливаем turbo глобально
RUN npm add -g turbo@^2.9.6
WORKDIR /app
# Копируем ВЕСЬ монорепозиторий
COPY . .
# Эта команда создает папку out/, в которой лежит ТОЛЬКО код apps/web и его зависимостей (packages/ui)
RUN turbo prune web --docker

# СТАДИЯ 2: Установка зависимостей (Installer)
FROM node:20-alpine AS installer
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Включаем pnpm
RUN corepack enable pnpm

# Копируем только файлы манифестов (package.json, pnpm-lock.yaml), чтобы закэшировать установку пакетов
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .

RUN pnpm install --frozen-lockfile

# Копируем реальный код (который меняется часто)
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

# Собираем ТОЛЬКО web (и его зависимости)
RUN npx turbo run build --filter=web...

# СТАДИЯ 3: Runner (Для Vite нужен веб-сервер, например Nginx)
FROM nginx:alpine AS runner

# Перенаправляем все запросы на index.html
RUN echo 'server { \
    listen 80; \
    location / { \
    root /usr/share/nginx/html; \
    try_files $uri $uri/ /index.html; \
    } \
    }' > /etc/nginx/conf.d/default.conf

# Копируем билд из папки dist (Vite кладет всё туда)
COPY --from=installer /app/apps/web/dist /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

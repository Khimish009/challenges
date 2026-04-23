# СТАДИЯ 1: Обрезка монорепы (Prune)
FROM node:20-alpine AS builder
RUN apk add --no-cache libc6-compat
# Устанавливаем turbo глобально
RUN npm add -g turbo@^2.9.6
WORKDIR /app
# Копируем ВЕСЬ монорепозиторий
COPY . .
# Эта команда создает папку out-web/, в которой лежит ТОЛЬКО код apps/web и его зависимостей (packages/ui)
RUN turbo prune web --docker --out-dir out-web

# СТАДИЯ 2: Установка зависимостей (Installer)
FROM node:20-alpine AS installer
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Включаем pnpm
RUN corepack enable pnpm

# Копируем только файлы манифестов для установки пакетов (кэшируем этот слой)
COPY .gitignore .gitignore
COPY --from=builder /app/out-web/json/ .
COPY --from=builder /app/out-web/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install --frozen-lockfile

# Теперь копируем исходники и устанавливаем
COPY --from=builder /app/out-web/full/ .
COPY turbo.json turbo.json

# Собираем ТОЛЬКО web (и его зависимости)
RUN pnpm exec turbo run build --filter=web...

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
COPY --from=installer --chown=nginx:nginx /app/apps/web/dist /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

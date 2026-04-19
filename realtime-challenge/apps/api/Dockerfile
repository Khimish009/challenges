# СТАДИЯ 1: Обрезка монорепы (Prune)
FROM node:20-alpine AS builder
RUN apk add --no-cache libc6-compat
# Устанавливаем turbo глобально
RUN npm add -g turbo@^2.9.6
WORKDIR /app

# Копируем весь монорепозиторий
COPY . .

# Эта команда создает папку out-api/, в которой лежит ТОЛЬКО код apps/api и его зависимостей
RUN turbo prune api --docker --out-dir out-api

# СТАДИЯ 2: Установка зависимостей (Installer)
FROM node:20-alpine AS installer
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Включаем pnpm
RUN corepack enable pnpm

# Копируем только файлы манифестов для установки пакетов (кэшируем этот слой)
COPY .gitignore .gitignore
COPY --from=builder /app/out-api/json/ .
COPY --from=builder /app/out-api/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install --frozen-lockfile

# Теперь копируем исходники
COPY --from=builder /app/out-api/full/ .
COPY turbo.json turbo.json

# Собираем ТОЛЬКО api (и его зависимости)
RUN pnpm exec turbo run build --filter=api...

# СТАДИЯ 3: Запуск (Runner)
FROM node:20-alpine AS runner
WORKDIR /app

# Безопасность: не запускаем под root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs
USER nestjs

# Копируем бандл NestJS
COPY --from=installer --chown=nestjs:nodejs /app/apps/api/dist ./apps/api/dist
# Копируем package.json, чтобы NestJS знал свои entrypoints
COPY --from=installer --chown=nestjs:nodejs /app/apps/api/package.json ./apps/api/package.json

# Копируем зависимости (корень И локальные)
COPY --from=installer --chown=nestjs:nodejs /app/node_modules ./node_modules
COPY --from=installer --chown=nestjs:nodejs /app/apps/api/node_modules ./apps/api/node_modules

EXPOSE 3000

CMD ["node", "apps/api/dist/main.js"]

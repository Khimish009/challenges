# bullmq-pdf-forge

> Демо проект по работе с фоновыми задачами — NestJS + BullMQ + Redis + React 19

Учебный челлендж: пользователь отправляет текст, фоновый воркер генерирует PDF (с искусственной задержкой 15 сек для симуляции тяжёлой задачи), фронтенд поллит статус до готовности файла.

## Что внутри

```
bullmq-pdf-forge/
├── backend/     # NestJS API + BullMQ worker
└── frontend/    # React 19 + Vite
```

## Стек

| Слой | Технология |
|---|---|
| Backend | NestJS 11, BullMQ, pdfkit |
| Брокер очереди | Redis 7 |
| Frontend | React 19, Vite 8, TypeScript |
| Мониторинг | Bull Board (`/queues`) |
| Контейнеризация | Docker + Docker Compose |

## Архитектура

```
React Frontend
    │
    │  POST /jobs { text }
    ▼
NestJS API ──────► BullMQ Queue ──────► Worker (JobsProcessor)
    │                  (Redis)               │
    │◄── { jobId, status: pending }          │ генерирует PDF
    │                                        │ сохраняет в /generated/
    │  GET /jobs/:id  (polling каждые 4s)    │
    ▼                                        ▼
Статус: waiting → active → completed ◄── returnvalue: { filePath }
```

## Ключевые возможности

- **Мгновенный ответ** — API сразу возвращает `{ jobId, status: 'pending' }`, не блокируя HTTP-сервер
- **Фоновая обработка** — генерация PDF выполняется в воркере асинхронно
- **Ограничение concurrency** — не более 2 задач выполняются одновременно
- **Автоматический retry** — 3 попытки с exponential backoff (5s → 10s → 20s) при ошибке
- **Polling** — фронт опрашивает статус каждые 4 секунды, останавливается при terminal-статусе
- **Bull Board** — визуальный дашборд очередей по адресу `http://localhost:3000/queues`

## Запуск

### Требования

- Node.js 22+
- pnpm
- Docker

### Локально (разработка)

```bash
# 1. Запустить Redis
docker compose up redis -d

# 2. Backend
cd backend
cp .env.example .env
pnpm install
pnpm start:dev

# 3. Frontend
cd frontend
pnpm install
pnpm dev
```

**Содержимое `backend/.env`:**
```env
REDIS_HOST=localhost
REDIS_PORT=6379
PORT=3000
```

### Через Docker Compose

```bash
docker compose up --build
```

| Сервис | URL |
|---|---|
| Frontend | `http://localhost` |
| Backend API | `http://localhost:3000` |
| Bull Board | `http://localhost:3000/queues` |

## API

| Метод | Эндпоинт | Описание |
|---|---|---|
| `POST` | `/jobs` | Создать задачу генерации PDF |
| `GET` | `/jobs/:id` | Получить статус и результат задачи |
| `GET` | `/jobs/:id/download` | Скачать сгенерированный PDF |

### POST `/jobs`

```json
// Запрос
{ "text": "Содержимое документа" }

// Ответ
{ "jobId": "1", "status": "pending" }
```

### GET `/jobs/:id`

```json
// Пока задача выполняется
{ "jobId": "1", "status": "active", "result": null }

// После завершения
{ "jobId": "1", "status": "completed", "result": { "filePath": "/app/generated/..." } }
```

## Концепции

| Концепция | Описание |
|---|---|
| **Job Queue** | Разделение HTTP-обработки и тяжёлых вычислений |
| **Worker** | Независимый процессор, работающий параллельно с API |
| **Concurrency** | Ограничение числа одновременных задач |
| **Retry + Backoff** | Автоматические повторы с нарастающей задержкой |
| **Polling** | Простая фронтенд-стратегия отслеживания асинхронных задач |
| **Bull Board** | Наблюдаемость состояния очередей без кастомного инструментария |

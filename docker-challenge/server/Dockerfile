FROM node:20-alpine

WORKDIR /app

COPY package.json .
COPY pnpm-lock.yaml .

RUN corepack enable pnpm
RUN pnpm install

COPY . .

RUN pnpm run build

CMD ["pnpm", "run", "start:prod"]

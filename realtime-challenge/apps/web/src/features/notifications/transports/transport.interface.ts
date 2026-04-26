import type { INotification, TransportType } from "@repo/shared";

export interface TransportEvents {
  notification: (notification: INotification) => void;
  error: (error: Error) => void;
  connectionChange: (status: ConnectionStatus) => void;
}

export type ConnectionStatus = 'connecting' | 'connected' | 'disconnected' | 'error';

export interface ITransport {
  /** Тип транспорта */
  readonly type: TransportType;

  /** Текущий статус соединения */
  readonly status: ConnectionStatus;

  /** Подключиться и начать получать уведомления */
  connect(): void;

  /** Корректно закрыть соединение и освободить ресурсы */
  disconnect(): void;

  /** Подписаться на событие */
  on<K extends keyof TransportEvents>(event: K, handler: TransportEvents[K]): void;

  /** Отписаться от события */
  off<K extends keyof TransportEvents>(event: K, handler: TransportEvents[K]): void;
}
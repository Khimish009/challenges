import { NotificationResponseDto } from "./notification.dto";

/** SSE event payload */
export interface SseNotificationEvent {
  type: "notification"; // имя SSE-события
  data: NotificationResponseDto;
  id: string; // SSE Last-Event-ID для reconnect
  retry?: number; // ms — подсказка клиенту для reconnect interval
}

/**
 * WebSocket incoming message (от клиента).
 * Нативный ws — это просто строки/буферы.
 * Мы определяем свой JSON-протокол поверх.
 */
export interface WsClientMessage {
  event: "subscribe" | "unsubscribe" | "mark_read";
  payload?: { notificationId?: string };
}

/** WebSocket outgoing message (от сервера) */
export interface WsServerMessage {
  event: "notification" | "notification_list" | "error";
  data:
  | NotificationResponseDto
  | NotificationResponseDto[]
  | { message: string };
  timestamp: string;
}

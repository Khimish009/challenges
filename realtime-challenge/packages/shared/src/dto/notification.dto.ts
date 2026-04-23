import { NotificationPriority } from "../enums/notification-priority.enum";
import { NotificationType } from "../enums/notification-type.enum";
import { INotification } from "../interfaces/notification.interface";

/** Для создания уведомления (POST /notifications) */
export interface CreateNotificationDto {
  type: NotificationType;
  priority: NotificationPriority;
  title: string; // min: 1, max: 200
  message: string; // min: 1, max: 2000
}

/** Ответ API — одно уведомление */
export type NotificationResponseDto = INotification

/** Обёртка для short polling — содержит курсор для инкрементального опроса */
export interface ShortPollingResponseDto {
  notifications: NotificationResponseDto[];
  cursor: string; // ISO timestamp или UUID последнего события
  hasMore: boolean;
}

/**
 * Обёртка для long polling.
 * Сервер держит HTTP-соединение открытым до:
 *   a) появления нового уведомления, или
 *   b) истечения timeout'а (→ 204 No Content)
 */
export interface LongPollingResponseDto {
  notifications: NotificationResponseDto[];
  cursor: string;
}

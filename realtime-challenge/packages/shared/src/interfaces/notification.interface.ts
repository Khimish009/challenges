import { NotificationPriority } from "../enums/notification-priority.enum";
import { NotificationType } from "../enums/notification-type.enum";

export interface INotification {
  id: string; // UUID v4
  type: NotificationType;
  priority: NotificationPriority;
  title: string;
  message: string;
  read: boolean;
  createdAt: string; // ISO 8601
}

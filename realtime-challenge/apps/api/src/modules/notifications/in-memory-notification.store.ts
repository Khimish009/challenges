import { Injectable } from '@nestjs/common';
import type { INotification } from '@repo/shared';
import type { INotificationStore } from './interfaces/notification-store.interface';

@Injectable()
export class InMemoryNotificationStore implements INotificationStore {
  private readonly store = new Map<string, INotification>();

  create(notification: INotification): INotification {
    this.store.set(notification.id, notification);
    return notification;
  }

  findAll(): INotification[] {
    return Array.from(this.store.values());
  }

  findSince(cursor: string): INotification[] {
    return this.findAll().filter((n) => n.createdAt > cursor);
  }
}

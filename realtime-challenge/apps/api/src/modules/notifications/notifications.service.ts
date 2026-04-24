import { Inject, Injectable } from '@nestjs/common';
import type { INotification } from '@repo/shared';
import { v4 as uuidv4 } from 'uuid';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NOTIFICATION_STORE, type INotificationStore } from './interfaces/notification-store.interface';

@Injectable()
export class NotificationsService {
  constructor(
    @Inject(NOTIFICATION_STORE) private readonly store: INotificationStore,
  ) {}

  create(dto: CreateNotificationDto): INotification {
    const notification: INotification = {
      id: uuidv4(),
      type: dto.type,
      priority: dto.priority,
      title: dto.title,
      message: dto.message,
      read: false,
      createdAt: new Date().toISOString(),
    };
    return this.store.create(notification);
  }

  findAll(): INotification[] {
    return this.store.findAll();
  }

  findSince(cursor: string): INotification[] {
    return this.store.findSince(cursor);
  }
}

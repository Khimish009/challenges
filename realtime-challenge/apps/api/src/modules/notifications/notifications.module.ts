import { Module } from '@nestjs/common';
import { InMemoryNotificationStore } from './in-memory-notification.store';
import { NOTIFICATION_STORE } from './interfaces/notification-store.interface';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';

@Module({
  controllers: [NotificationsController],
  providers: [
    NotificationsService,
    { provide: NOTIFICATION_STORE, useClass: InMemoryNotificationStore },
  ],
})
export class NotificationsModule {}

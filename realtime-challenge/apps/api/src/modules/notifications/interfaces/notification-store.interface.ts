import type { INotification } from '@repo/shared';

export const NOTIFICATION_STORE = Symbol('NOTIFICATION_STORE');

export interface INotificationStore {
  create(notification: INotification): INotification;
  findAll(): INotification[];
  findSince(cursor: string): INotification[];
}

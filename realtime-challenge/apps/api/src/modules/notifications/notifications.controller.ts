import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query } from '@nestjs/common';
import type { INotification, ShortPollingResponseDto } from '@repo/shared';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateNotificationDto): INotification {
    return this.notificationsService.create(dto);
  }

  @Get()
  findAll(): INotification[] {
    return this.notificationsService.findAll();
  }

  @Get('poll')
  getPollNotifications(@Query('cursor') cursor?: string): ShortPollingResponseDto {
    return this.notificationsService.getPollNotifications(cursor)
  }
}

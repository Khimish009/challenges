import { IsEnum, IsString, MaxLength, MinLength } from 'class-validator';
import { NotificationPriority, NotificationType } from '@repo/shared';

export class CreateNotificationDto {
  @IsEnum(NotificationType)
  type!: NotificationType;

  @IsEnum(NotificationPriority)
  priority!: NotificationPriority;

  @IsString()
  @MinLength(1)
  @MaxLength(200)
  title!: string;

  @IsString()
  @MinLength(1)
  @MaxLength(2000)
  message!: string;
}

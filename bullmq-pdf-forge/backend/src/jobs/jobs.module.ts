import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'pdf-generation',
    }),
  ],
  controllers: [],
  providers: [],
})
export class JobsModule {}

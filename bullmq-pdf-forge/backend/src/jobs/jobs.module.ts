import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';
import { JobsProcessor } from './jobs.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'pdf-generation',
    }),
    BullBoardModule.forFeature({
      name: 'pdf-generation',
      adapter: BullMQAdapter,
    }),
  ],
  controllers: [JobsController],
  providers: [JobsService, JobsProcessor],
})
export class JobsModule {}

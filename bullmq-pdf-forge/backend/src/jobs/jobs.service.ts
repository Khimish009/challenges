import { InjectQueue } from "@nestjs/bullmq"
import { Queue } from "bullmq"
import { CreateJobDto } from "./dto/create-job.dto"
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common"

@Injectable()
export class JobsService {
    constructor(
        @InjectQueue('pdf-generation') private readonly queue: Queue<CreateJobDto>
    ) { }

    private async findJobOrThrow(id: string) {
        const job = await this.queue.getJob(id)

        if (!job) {
            throw new NotFoundException(`Job ${id} not found`)
        }

        return job
    }

    async createJob(dto: CreateJobDto) {
        const { text } = dto

        const job = await this.queue.add('generate-pdf', { text }, {
            attempts: 3,
            backoff: {
                type: 'exponential',
                delay: 5000
            }
        })

        return { jobId: job.id, status: 'pending' }
    }

    async getJob(id: string) {
        const job = await this.findJobOrThrow(id)

        return {
            jobId: job.id,
            status: await job.getState(),
            result: job.returnvalue,
        }
    }

    async downloadFile(id: string) {
        const job = await this.findJobOrThrow(id)
        const state = await job.getState()

        if (state !== 'completed') {
            throw new BadRequestException(`Job is not completed yet. Current status: ${state}`);
        }

        return job.returnvalue.filePath
    }
}
import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq'
import { Logger } from '@nestjs/common'
import PDFDocument from 'pdfkit';
import { Job } from 'bullmq'
import { join, dirname } from 'node:path'
import fs from 'fs';

@Processor('pdf-generation', {
    concurrency: 2
})
export class JobsProcessor extends WorkerHost {
    private readonly logger = new Logger(JobsProcessor.name)

    async process(job: Job): Promise<{ filePath: string }> {
        this.logger.log(`Processing job #${job.id}`)
        const { text } = job.data

        await new Promise((resolve) => setTimeout(resolve, 15000))

        const fileName = `${Date.now()}.pdf`;
        const filePath = join(process.cwd(), 'generated', fileName)

        fs.mkdirSync(dirname(filePath), { recursive: true });

        return new Promise((resolve, reject) => {
            const document = new PDFDocument()
            const stream = fs.createWriteStream(filePath)

            stream.on('error', (err) => reject(err))

            stream.on('finish', () => {
                this.logger.log(`Job #${job.id} completed: ${filePath}`)
                resolve({ filePath })
            })

            document.pipe(stream)

            document.fontSize(14).text(text)

            document.end()
        })
    }

    // События BullMQ
    @OnWorkerEvent('failed')
    onFailed(job: Job, error: Error) {
        this.logger.error(`Job #${job.id} failed: ${error.message}`)
    }

    @OnWorkerEvent('active')
    onActive(job: Job) {
        this.logger.log(`Job #${job.id} started. Attempt ${job.attemptsMade + 1}`)
    }
}

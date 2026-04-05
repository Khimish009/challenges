import { Processor, WorkerHost } from '@nestjs/bullmq'
import PDFDocument from 'pdfkit';
import { Job } from 'bullmq'
import { join, dirname } from 'node:path'
import fs from 'fs';

@Processor('pdf-generation')
export class JobsProcessor extends WorkerHost {
    async process(job: Job): Promise<{ filePath: string }> {
        const { text } = job.data

        await new Promise((resolve) => setTimeout(resolve, 15000))

        const fileName = `${Date.now()}.pdf`;
        const filePath = join(process.cwd(), 'generated', fileName)

        fs.mkdirSync(dirname(filePath), { recursive: true });

        return new Promise((resolve, reject) => {
            const document = new PDFDocument()
            const stream = fs.createWriteStream(filePath)

            stream.on('error', (err) => reject(err))

            stream.on('finish', () => resolve({ filePath }))

            document.pipe(stream)

            document.fontSize(14).text(text)

            document.end()
        })
    }
}

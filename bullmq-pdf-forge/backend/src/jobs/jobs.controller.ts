import { Post, Get, Body, Res, Param, Controller } from "@nestjs/common";
import { type Response } from 'express';
import { JobsService } from "./jobs.service";
import { CreateJobDto } from "./dto/create-job.dto";

@Controller('jobs')
export class JobsController {
    constructor(private readonly jobService: JobsService) { }

    @Post()
    async createJob(@Body() dto: CreateJobDto) {
        return this.jobService.createJob(dto)
    }

    @Get(':id')
    async getJob(@Param('id') id: string) {
        return this.jobService.getJob(id)
    }

    @Get(':id/download')
    async downloadFile(@Param('id') id: string, @Res() res: Response) {
        const filePath = await this.jobService.downloadFile(id)

        res.download(filePath)
    }
}
import { Post, Get, Body, Param, Controller } from "@nestjs/common";
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
}
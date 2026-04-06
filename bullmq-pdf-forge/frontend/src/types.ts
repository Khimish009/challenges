export type JobStatus = 'completed' | 'failed' | 'active' | 'delayed' | 'prioritized' | 'waiting' | 'waiting-children'

export type CreateJobResponse = {
    jobId: 'pending',
    status: string
}

export type GetJobResponse = {
    jobId: string;
    status: JobStatus;
    result: { filePath: string } | null
}
export const STATUS_LABEL: Record<string, string> = {
    waiting: 'Queued',
    active: 'Processing',
    completed: 'Ready',
    failed: 'Failed',
    delayed: 'Delayed',
    prioritized: 'Prioritized',
}

export const STATUS_DESCRIPTION: Record<string, string> = {
    waiting: 'Your job is in the queue…',
    active: 'Generating your PDF — this may take up to 15 seconds',
    completed: 'Your document is ready to download',
    failed: 'Something went wrong. The job will be retried automatically.',
    delayed: 'Job is scheduled for later processing',
    prioritized: 'Job is prioritized in the queue',
}
import { useEffect, useRef, useState } from "react";
import { getJob } from "../api/jobs";
import type { GetJobResponse } from "../types";

export function useJobPolling(jobId: string | null) {
    const [job, setJob] = useState<GetJobResponse | null>(null)
    const timerId = useRef<number | null>(null)

    useEffect(() => {
        if (!jobId) return

        const clearIntervalFunc = () => {
            if (timerId.current) {
                clearInterval(timerId.current)
            }
        }

        timerId.current = window.setInterval(async () => {
            const job = await getJob(jobId)

            setJob(job)

            if (job.status === 'completed' || job.status === 'failed') {
                clearIntervalFunc()
            }
        }, 4000);

        return () => clearIntervalFunc()
    }, [jobId])

    return job
}
import { useEffect, useRef, useState } from "react";
import { getJob } from "../api/jobs";
import type { GetJobResponse } from "../types";

export function useJobPolling(jobId: string | null) {
    const [job, setJob] = useState<GetJobResponse | null>(null)
    const [error, setError] = useState<string | null>(null)
    const timerId = useRef<number | null>(null)

    useEffect(() => {
        if (!jobId) return

        const clearIntervalFunc = () => {
            if (timerId.current) {
                clearInterval(timerId.current)
            }
        }

        timerId.current = window.setInterval(async () => {
            try {
                const data = await getJob(jobId)
                setJob(data)
                setError(null)

                if (data.status === 'completed' || data.status === 'failed') {
                    clearIntervalFunc()
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Polling error')
                // не останавливаем интервал — попробуем снова через 4 сек
            }
        }, 4000);

        return () => clearIntervalFunc()
    }, [jobId])

    return { job, error }
}
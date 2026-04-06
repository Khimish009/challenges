import type { CreateJobResponse, GetJobResponse } from "../types"

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

export async function createJob(text: string): Promise<CreateJobResponse> {
    const result = await fetch(`${API_URL}/jobs`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ text })
    })

    if (!result.ok) {
        throw new Error(`Failed to post job: ${result.status}`)
    }

    return result.json()
}

export async function getJob(jobId: string): Promise<GetJobResponse> {
    const result = await fetch(`${API_URL}/jobs/${jobId}`, {
        method: 'GET',
    })

    if (!result.ok) {
        throw new Error(`Failed to fetch job ${jobId}: ${result.status}`)
    }

    return result.json()
}

export function getDownloadUrl(jobId: string) {
    return `${API_URL}/jobs/${jobId}/download`
}

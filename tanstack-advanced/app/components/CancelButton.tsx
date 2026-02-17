"use client"

import { useCancelPosts } from "../hooks"

export const CancelButton = () => {
    const cancel = useCancelPosts()

    return <button onClick={cancel}>Cancel</button>
}
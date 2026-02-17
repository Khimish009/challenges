"use client"

import { useCacheControls } from "../hooks"

export const CacheButtons = () => {
    const { cancel, remove, refetch, invalidate } = useCacheControls()

    return (
        <div className="flex">
            <button onClick={cancel}>Cancel</button>
            <button onClick={remove}>Remove</button>
            <button onClick={refetch}>Refetch</button>
            <button onClick={invalidate}>Invalidate</button>
        </div>
    )
}
"use client"

import { useCacheControls } from "../hooks"

const baseStyles = "px-4 py-2 text-xs font-medium rounded-lg border transition-all duration-200 cursor-pointer active:scale-95"

const buttons = [
    { label: "Cancel", variant: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30 hover:bg-yellow-500/25 hover:border-yellow-500/50" },
    { label: "Remove", variant: "bg-red-500/15 text-red-400 border-red-500/30 hover:bg-red-500/25 hover:border-red-500/50" },
    { label: "Refetch", variant: "bg-blue-500/15 text-blue-400 border-blue-500/30 hover:bg-blue-500/25 hover:border-blue-500/50" },
    { label: "Invalidate", variant: "bg-violet-500/15 text-violet-400 border-violet-500/30 hover:bg-violet-500/25 hover:border-violet-500/50" },
] as const

export const CacheButtons = () => {
    const { cancel, remove, refetch, invalidate } = useCacheControls()
    const actions = { Cancel: cancel, Remove: remove, Refetch: refetch, Invalidate: invalidate }

    return (
        <div className="flex flex-wrap gap-2">
            {buttons.map(({ label, variant }) => (
                <button
                    key={label}
                    onClick={actions[label]}
                    className={`${baseStyles} ${variant}`}
                >
                    {label}
                </button>
            ))}
        </div>
    )
}
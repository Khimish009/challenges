"use client"

interface PostItemProps {
    id: number
    title: string
    onUpdate: () => void
}

export const PostItem = ({ id, title, onUpdate }: PostItemProps) => {
    return (
        <article
            onClick={onUpdate}
            className="group relative p-4 rounded-xl bg-white/5 border border-white/10 cursor-pointer transition-all duration-300 hover:bg-white/10 hover:border-violet-500/50 hover:shadow-lg hover:shadow-violet-500/10 hover:-translate-y-0.5 active:scale-[0.98]"
        >
            <div className="flex items-start gap-3">
                <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-violet-500/20 text-violet-400 text-sm font-mono font-bold">
                    {id}
                </span>
                <p className="text-sm leading-relaxed text-gray-300 group-hover:text-white transition-colors">
                    {title}
                </p>
            </div>
        </article>
    )
}

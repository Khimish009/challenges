"use client"

import { useInfinitePosts, useUpdatePost } from "../hooks"
import type { Post } from "../types"
import { CacheButtons } from "./CacheButtons"
import { PostItem } from "./PostItem"
import { LoadingSpinner } from "./LoadingSpinner"
import { ErrorMessage } from "./ErrorMessage"

export const PostList = ({ initialData }: { initialData?: Post[] }) => {
    const { posts, isError, error, isPending, hasNextPage, loadMoreRef } = useInfinitePosts({ initialData })
    const { updatePost } = useUpdatePost()

    if (isPending) {
        return <LoadingSpinner />
    }

    if (isError) {
        return <ErrorMessage message={error?.message} />
    }

    return (
        <div className="space-y-6">
            <CacheButtons />
            <div className="space-y-3">
                {posts?.map(post => (
                    <PostItem
                        key={post.id}
                        id={post.id}
                        title={post.title}
                        onUpdate={() => updatePost({ postId: post.id, updates: { title: `${post.title} ✅` } })}
                    />
                ))}
                {hasNextPage && (
                    <div
                        ref={loadMoreRef}
                        className="flex items-center justify-center py-6 text-sm text-gray-500"
                    >
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full border-2 border-transparent border-t-violet-500 animate-spin" />
                            Loading more...
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
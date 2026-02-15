"use client"

import { useInfinitePosts, useUpdatePost } from "../hooks"
import { Post } from "../types"

export const PostList = ({ initialData }: { initialData?: Post[] }) => {
    const { posts, isError, error, isPending, hasNextPage, loadMoreRef } = useInfinitePosts({ initialData })
    const { updatePost } = useUpdatePost()

    if (isPending) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>{error?.message}</div>
    }

    return (
        <div>
            {posts?.map(post => {
                return (
                    <div
                        key={post.id}
                        onClick={() => updatePost({ postId: post.id, updates: { title: `${post.title} ✅` } })}
                    >
                        {post.title}
                    </div>
                )
            })}
            {hasNextPage && <div ref={loadMoreRef}>Load more</div>}
        </div>
    )
}
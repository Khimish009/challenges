"use client"

import { useInfinitePosts } from "../hooks"
import { Post } from "../types"

export const PostList = ({ initialData }: { initialData?: Post[] }) => {
    const { posts, isError, error, isPending, hasNextPage, loadMoreRef } = useInfinitePosts({ initialData })

    if (isPending) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>{error?.message}</div>
    }

    return (
        <div>
            {posts?.map(post => {
                return <div key={post.id}>{post.title}</div>
            })}
            {hasNextPage && <div ref={loadMoreRef}>Load more</div>}
        </div>
    )
}
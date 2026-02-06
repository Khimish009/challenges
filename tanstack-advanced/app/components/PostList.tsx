"use client"

import { usePost } from "../hooks"

export const PostList = () => {
    const { posts } = usePost()

    return (
        <div>
            {posts?.map(post => {
                return <div key={post.id}>{post.title}</div>
            })}
        </div>
    )
}
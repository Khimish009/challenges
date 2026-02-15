import { POSTS_API_URL, POSTS_PER_PAGE } from "../constants"
import { Post } from "../types"

export const fetchPosts = async (pageParam = 1): Promise<Post[]> => {
    const result = await fetch(`${POSTS_API_URL}?_page=${pageParam}&_limit=${POSTS_PER_PAGE}`)

    if (!result.ok) {
        throw new Error(`Failed to fetch posts: ${result.status}`)
    }

    return result.json()
}

export const updatePost = async (postId: number, updates: Partial<Post>): Promise<Post> => {
    const result = await fetch(`${POSTS_API_URL}/${postId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates)
    })

    if (!result.ok) {
        throw new Error('Failed to update post')
    }

    return result.json()
}
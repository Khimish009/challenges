import { POSTS_API_URL, POSTS_PER_PAGE } from "../constants"
import { Post } from "../types"

export const fetchPosts = async (pageParam = 1): Promise<Post[]> => {
    const result = await fetch(`${POSTS_API_URL}?_page=${pageParam}&_limit=${POSTS_PER_PAGE}`)

    if (!result.ok) {
        throw new Error(`Failed to fetch posts: ${result.status}`)
    }

    return result.json()
}
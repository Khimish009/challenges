import { useQuery } from "@tanstack/react-query"
import { QUERY_KEYS, POSTS_API_URL } from "../constants"
import type { Post } from "../types"

export const usePost = () => {
    const { data, isError, error } = useQuery<Post[]>({
        queryKey: QUERY_KEYS.posts,
        queryFn: () =>
            fetch(POSTS_API_URL).then((res) => {
                if (!res.ok) throw new Error('Network response was not ok')

                return res.json()
            }),
        staleTime: 2500
    })

    return {
        posts: data,
        isError,
        error
    }
}
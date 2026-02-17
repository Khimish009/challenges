import { useQueryClient } from "@tanstack/react-query"
import { QUERY_KEYS } from "../constants"

export const useCancelPosts = () => {
    const queryClient = useQueryClient()

    return async () => await queryClient.cancelQueries({ queryKey: QUERY_KEYS.posts })
}
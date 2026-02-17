import { useQueryClient } from "@tanstack/react-query"
import { QUERY_KEYS } from "../constants"

export const useCacheControls = () => {
    const queryClient = useQueryClient()

    return {
        cancel: () => queryClient.cancelQueries({ queryKey: QUERY_KEYS.posts }),
        remove: () => queryClient.removeQueries({ queryKey: QUERY_KEYS.posts }),
        refetch: () => queryClient.refetchQueries({ queryKey: QUERY_KEYS.posts }),
        invalidate:() => queryClient.invalidateQueries({ queryKey: QUERY_KEYS.posts })
    }
}
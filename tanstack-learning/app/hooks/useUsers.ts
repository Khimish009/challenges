import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { User } from "../types"
import { QUERY_KEYS, USERS_API_URL } from "../constants"

export const useUsers = () => {
    const queryClient = useQueryClient()
    const query = useQuery<User[]>({
        queryKey: [QUERY_KEYS.users],
        queryFn: () =>
            fetch(USERS_API_URL).then((res) => {
                if (!res.ok) throw new Error('Network response was not ok')
                return res.json()
            }),
        staleTime: 2500,
    })

    const refetchUsers = () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.users] })

    const mutation = useMutation({
        mutationFn: ({ newTitle, userId }: { newTitle: string, userId: number }) => {
            return fetch(`${USERS_API_URL}/${userId}`, {
                method: 'PATCH',
                body: JSON.stringify({ name: newTitle }),
                headers: { 'Content-type': 'application/json; charset=UTF-8' }
            }).then(res => {
                if (!res.ok) throw new Error('Network response was not ok')
                return res.json()
            })
        },
        onMutate: async ({ newTitle, userId }: { newTitle: string, userId: number }) => {
            await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.users] })

            const previousUsers = queryClient.getQueryData<User[]>([QUERY_KEYS.users])

            queryClient.setQueryData([QUERY_KEYS.users], (old: User[] | undefined) => {
                if (!old) return []

                return old.map(user => user.id === userId ? { ...user, name: newTitle } : user)
            })

            return { previousUsers }
        },
        onError: (_, __, context) => {
            if (context?.previousUsers) {
                queryClient.setQueryData([QUERY_KEYS.users], context.previousUsers)
            }
        },
        onSettled: () => {
            refetchUsers()
        }
    })

    return {
        users: query.data,
        isLoading: query.isPending,
        isError: query.isError,
        error: query.error,
        isProcessing: mutation.isPending || query.isFetching,
        isUpdating: mutation.isPending,
        updateUser: mutation.mutate,
        refetchUsers
    }
}
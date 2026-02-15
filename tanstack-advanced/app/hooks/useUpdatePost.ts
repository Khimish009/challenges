import { InfiniteData, useMutation, useQueryClient } from "@tanstack/react-query"
import { updatePost as updatePostApi } from "../api"
import type { Post, UpdatePostVariables } from "../types"
import { QUERY_KEYS } from "../constants"

const updatePostInPages = (
    pages: Post[][],
    postId: number,
    updater: (post: Post) => Post
): Post[][] => {
    return pages.map(page =>
        page.map(post =>
            post.id === postId ? updater(post) : post
        )
    )
}

export const useUpdatePost = () => {
    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: ({ postId, updates }: UpdatePostVariables) => updatePostApi(postId, updates),
        onMutate: async (newPost) => {
            await queryClient.cancelQueries({ queryKey: QUERY_KEYS.posts })

            const previousPosts = queryClient.getQueryData<InfiniteData<Post[]>>(QUERY_KEYS.posts)

            queryClient.setQueryData<InfiniteData<Post[]>>(QUERY_KEYS.posts, (old) => {
                if (!old) return old

                return {
                    ...old,
                    pages: updatePostInPages(old.pages, newPost.postId, (post) => ({
                        ...post,
                        ...newPost.updates
                    }))
                }
            })

            return { previousPosts }
        },
        onError: (_, __, context) => {
            if (context?.previousPosts) {
                queryClient.setQueryData(QUERY_KEYS.posts, context.previousPosts)
            }
        },
        onSuccess: (data) => {
            queryClient.setQueryData<InfiniteData<Post[]>>(QUERY_KEYS.posts, (old) => {
                if (!old) return old

                return {
                    ...old,
                    pages: updatePostInPages(old.pages, data.id, () => data)
                }
            })
        },
    })

    return {
        updatePost: mutate
    }
}
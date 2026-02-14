import { useInfiniteQuery } from "@tanstack/react-query"
import { POSTS_PER_PAGE, QUERY_KEYS } from "../constants"
import { Post } from "../types"
import { fetchPosts } from "../api/posts"
import { useEffect, useRef, useState } from "react"

export const useInfinitePosts = ({ initialData }: { initialData?: Post[] }) => {
    const loadMoreRef = useRef(null)

    const query = useInfiniteQuery({
        queryKey: QUERY_KEYS.posts,
        queryFn: ({ pageParam }) => fetchPosts(pageParam),
        initialPageParam: initialData ? 2 : 1,
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.length < POSTS_PER_PAGE) return undefined
            return allPages.length + 1
        },
        ...(initialData && {
            initialData: {
                pages: [initialData],
                pageParams: [1]
            }
        })
    })

    useEffect(() => {
        if (!loadMoreRef.current) return

        const observer = new IntersectionObserver((entries) => {
            const [entry] = entries
            if (entry.isIntersecting && query.hasNextPage && !query.isFetchingNextPage) {
                query.fetchNextPage()
            }
        }, {
            threshold: 0,
            rootMargin: '200px'
        })

        observer.observe(loadMoreRef.current)
        return () => observer.disconnect()
    }, [query.isFetchingNextPage])

    return {
        posts: query.data?.pages.flat(),
        error: query.error,
        isError: query.isError,
        isPending: query.isPending,
        isFetching: query.isFetching,
        hasNextPage: query.hasNextPage,
        fetchNextPage: query.fetchNextPage,
        isFetchingNextPage: query.isFetchingNextPage,
        loadMoreRef,
    }
}
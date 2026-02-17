import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query"
import { POSTS_PER_PAGE, QUERY_KEYS } from "../constants"
import type { Post } from "../types"
import { fetchPosts } from "../api"
import { useCallback, useEffect, useRef } from "react"

export const useInfinitePosts = ({ initialData }: { initialData?: Post[] }) => {
    const loadMoreRef = useRef(null)

    const selectPosts = useCallback((data: InfiniteData<Post[], number>) => {
        return data.pages.map((page) => page.map(({ id, title }) => ({ id, title }))).flat()
    }, [])

    const query = useInfiniteQuery({
        queryKey: QUERY_KEYS.posts,
        queryFn: ({ pageParam, signal }) => fetchPosts(pageParam, signal),
        initialPageParam: initialData ? 2 : 1,
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.length < POSTS_PER_PAGE) return undefined
            return allPages.length + 1
        },
        staleTime: 5 * 1000,
        gcTime: 30 * 1000,
        select: selectPosts,
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
        posts: query.data,
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
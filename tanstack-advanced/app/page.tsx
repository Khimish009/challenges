import { fetchPosts } from "./api";
import { PostList } from "./components";
import type { Post } from "./types";

export default async function Home() {
  let initialPostData: Post[] | undefined

  try {
    initialPostData = await fetchPosts()
  } catch (error) {
    console.error('Server fetch failed:', error)
  }

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
            TanStack Query
          </h1>
          <p className="text-sm text-gray-500">
            Advanced • Infinite Scroll • Optimistic Updates • Cache Control
          </p>
        </header>
        <PostList initialData={initialPostData} />
      </div>
    </main>
  );
}

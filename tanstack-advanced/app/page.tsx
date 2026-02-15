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
    <div>
      Challenge advanced
      <PostList initialData={initialPostData} />
    </div>
  );
}

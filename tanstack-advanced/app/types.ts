export type Post = {
    userId: number
    id: number
    title: string
    body: string
}

declare global {
  interface Window {
    __TANSTACK_QUERY_CLIENT__:
      import("@tanstack/query-core").QueryClient;
  }
}
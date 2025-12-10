import { GetPostsResponse } from "../model/post"

const getSearchPostsApi = async ({ searchQuery }: { searchQuery: string }): Promise<GetPostsResponse> => {
  try {
    const response = await fetch(`/api/posts/search?q=${searchQuery}`)
    const data: GetPostsResponse = await response.json()

    return data
  } catch (error) {
    console.error("게시물 검색 오류:", error)
    return { posts: [], total: 0, skip: 0, limit: 0 }
  }
}

export default getSearchPostsApi

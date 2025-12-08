import getUsersApi from "./getUsersApi"
import { GetPostsResponse, Post } from "../types/post"

// TODO: getUserApi분리
const getPostsApi = async ({
  limit,
  skip,
}: {
  limit: number
  skip: number
}): Promise<{
  posts: (Post & { author?: { id: number; username: string; image: string } })[]
  total: number
  skip: number
  limit: number
}> => {
  try {
    const postResponse = await fetch(`/api/posts?limit=${limit}&skip=${skip}`)
    const postsData: GetPostsResponse = await postResponse.json()

    const { users: usersData } = await getUsersApi()

    const postsWithUsers = postsData.posts.map((post) => ({
      ...post,
      author: usersData.find((user) => user.id === post.userId),
    }))

    return { posts: postsWithUsers, total: postsData.total, skip, limit }
  } catch (error) {
    console.error("게시물 가져오기 오류:", error)
    return { posts: [], total: 0, skip: 0, limit: 0 }
  }
}

export default getPostsApi

import { AddPostRequest } from "../model/post"
import { getApiUrl } from "../../../shared/api/apiClient"

const addPostApi = async ({ post }: { post: AddPostRequest }) => {
  try {
    const response = await fetch(getApiUrl("/posts/add"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error("게시물 추가 오류:", error)
  }
}

export default addPostApi

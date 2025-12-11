import { getApiUrl } from "../../../shared/api/apiClient"

const likeCommentApi = async ({ id, likes }: { id: number; likes: number }) => {
  try {
    const response = await fetch(getApiUrl(`/comments/${id}`), {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes }),
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error("댓글 좋아요 오류:", error)
  }
}

export default likeCommentApi

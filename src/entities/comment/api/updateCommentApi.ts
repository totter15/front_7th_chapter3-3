const updateCommentApi = async ({ comment }: { comment: any }) => {
  try {
    const response = await fetch(`/api/comments/${comment.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(comment.body),
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error("댓글 수정 오류:", error)
  }
}
export default updateCommentApi

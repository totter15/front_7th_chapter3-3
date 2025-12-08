const deleteCommentApi = async ({ id }: { id: number }) => {
  try {
    const response = await fetch(`/api/comments/${id}`, {
      method: "DELETE",
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error("댓글 삭제 오류:", error)
  }
}

export default deleteCommentApi

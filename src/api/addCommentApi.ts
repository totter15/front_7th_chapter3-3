const addCommentApi = async ({ comment }: { comment: any }) => {
  try {
    const response = await fetch(`/api/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(comment),
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error("댓글 추가 오류:", error)
  }
}

export default addCommentApi

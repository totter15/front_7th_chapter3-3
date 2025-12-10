const updatePostApi = async ({ post }: { post: any }) => {
  try {
    const response = await fetch(`/api/posts/${post.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error("게시물 업데이트 오류:", error)
  }
}

export default updatePostApi

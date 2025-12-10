const addPostApi = async ({ post }: { post: any }) => {
  try {
    const response = await fetch("/api/posts/add", {
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

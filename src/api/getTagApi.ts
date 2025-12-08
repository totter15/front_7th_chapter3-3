import { Tag } from "../types/tag"

const getTagApi = async ({ tag }: { tag: string }): Promise<Tag[]> => {
  try {
    const response = await fetch(`/api/posts/tag/${tag}`)
    const data = await response.json()
    return data
  } catch (error) {
    console.error("태그 가져오기 오류:", error)
    return []
  }
}

export default getTagApi

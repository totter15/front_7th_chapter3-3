import { useState } from "react"
import { Post } from "../../../entities/post/model/post"

const useEditPost = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)

  const openEditPost = (post: Post) => {
    setSelectedPost(post)
    setIsOpen(true)
  }
}

export default useEditPost

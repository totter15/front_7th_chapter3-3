import { useState, useCallback } from "react"
import getCommentsApi from "../../../entities/comment/api/getCommentsApi"
import { AddCommentRequest, Comment } from "../../../entities/comment/model/comment"
import addCommentApi from "../../../entities/comment/api/addCommentApi"
import updateCommentApi from "../../../entities/comment/api/updateCommentApi"
import deleteCommentApi from "../../../entities/comment/api/deleteCommentApi"
import likeCommentApi from "../../../entities/comment/api/likeCommentApi"

const useComment = () => {
  const [comments, setComments] = useState<{ [key: number]: Comment[] }>({})

  const getComments = useCallback(async (postId: number) => {
    const data = await getCommentsApi({ postId })
    setComments((prev) => ({ ...prev, [postId]: data.comments }))
  }, [])

  const addComment = useCallback(async (comment: AddCommentRequest) => {
    const data = await addCommentApi({ comment })
    if (!data) return

    setComments((prev) => ({ ...prev, [data.postId]: [...(prev[data.postId] || []), data] }))
  }, [])

  const updateComment = useCallback(async (comment: Comment) => {
    const data = await updateCommentApi({ comment })
    if (!data) return

    setComments((prev) => ({ ...prev, [data.postId]: prev[data.postId].map((c) => (c.id === data.id ? data : c)) }))
  }, [])

  const deleteComment = useCallback(async (id: number, postId: number) => {
    await deleteCommentApi({ id })
    setComments((prev) => ({ ...prev, [postId]: prev[postId].filter((c) => c.id !== id) }))
  }, [])

  const likeComment = useCallback(async (id: number, postId: number) => {
    const currentComment = comments[postId].find((c) => c.id === id)
    if (!currentComment) return
    const data = await likeCommentApi({ id, likes: currentComment.likes + 1 })
    setComments((prev) => ({ ...prev, [postId]: prev[postId].map((c) => (c.id === data.id ? data : c)) }))
  }, [])

  return {
    comments,
    getComments,
    addComment,
    updateComment,
    deleteComment,
    likeComment,
  }
}

export default useComment

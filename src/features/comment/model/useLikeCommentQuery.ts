import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Comment } from "../../../entities/comment/model/comment"
import likeCommentApi from "../../../entities/comment/api/likeCommentApi"
import { COMMENTS_QUERY_KEY } from "../../../entities/comment/model/useCommentsQuery"

interface LikeCommentParams {
  id: number
  postId: number
  likes: number
}

const useLikeCommentQuery = () => {
  const queryClient = useQueryClient()

  const { mutate: likeComment, ...rest } = useMutation<Comment, Error, LikeCommentParams>({
    mutationFn: ({ id, likes }: LikeCommentParams) => likeCommentApi({ id, likes }),
    onSuccess: (data) => {
      console.log({ data })
      queryClient.setQueryData(
        [COMMENTS_QUERY_KEY, data.postId],
        (old: Comment[]) =>
          old.map((c: Comment) => (c.id === data.id ? { ...data, likes: c.likes + 1 } : c)) as Comment[],
      )
    },
  })

  return { likeComment, ...rest }
}

export default useLikeCommentQuery

import { useMutation, useQueryClient } from "@tanstack/react-query"
import likeCommentApi from "../../../entities/comment/api/likeCommentApi"
import { Comment } from "../../../entities/comment/model/comment"
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
    onMutate: ({ id, postId }: LikeCommentParams) => {
      queryClient.setQueryData(
        [COMMENTS_QUERY_KEY, postId],
        (old: any) => old.map((c: Comment) => (c.id === id ? { ...c, likes: c.likes + 1 } : c)) as Comment[],
      )
    },
  })

  return { likeComment, ...rest }
}

export default useLikeCommentQuery

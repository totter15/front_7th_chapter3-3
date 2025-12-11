import { useMutation, useQueryClient } from "@tanstack/react-query"
import deleteCommentApi from "../../../entities/comment/api/deleteCommentApi"
import { COMMENTS_QUERY_KEY } from "../../../entities/comment/model/useCommentsQuery"
import { Comment } from "../../../entities/comment/model/comment"

interface DeleteCommentParams {
  id: number
  postId: number
}

const useDeleteCommentQuery = () => {
  const queryClient = useQueryClient()

  const { mutate: deleteComment, ...rest } = useMutation<void, Error, DeleteCommentParams>({
    mutationFn: ({ id }: DeleteCommentParams) => deleteCommentApi({ id }),
    onSuccess: (_, variables) => {
      queryClient.setQueryData(
        [COMMENTS_QUERY_KEY, variables.postId],
        (old: any) => old.filter((c: Comment) => c.id !== variables.id) as Comment[],
      )
    },
  })

  return { deleteComment, ...rest }
}

export default useDeleteCommentQuery

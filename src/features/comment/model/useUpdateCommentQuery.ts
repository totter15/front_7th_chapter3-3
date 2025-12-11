import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Comment } from "../../../entities/comment/model/comment"
import updateCommentApi from "../../../entities/comment/api/updateCommentApi"
import { COMMENTS_QUERY_KEY } from "../../../entities/comment/model/useCommentsQuery"

const useUpdateCommentQuery = () => {
  const queryClient = useQueryClient()

  const { mutate: updateComment, ...rest } = useMutation<Comment, Error, { comment: Comment }>({
    mutationFn: ({ comment }: { comment: Comment }) => updateCommentApi({ comment }),
    onSuccess: (data) => {
      queryClient.setQueryData(
        [COMMENTS_QUERY_KEY, data.postId],
        (old: any) => old.map((c: Comment) => (c.id === data.id ? data : c)) as Comment[],
      )
    },
  })

  return { updateComment, ...rest }
}

export default useUpdateCommentQuery

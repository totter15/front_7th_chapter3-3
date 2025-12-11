import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AddCommentRequest, Comment } from "../../../entities/comment/model/comment"
import addCommentApi from "../../../entities/comment/api/addCommentApi"
import { COMMENTS_QUERY_KEY } from "../../../entities/comment/model/useCommentsQuery"

const useAddCommentQuery = () => {
  const queryClient = useQueryClient()

  const { mutate: addComment, ...rest } = useMutation<Comment | undefined, Error, { comment: AddCommentRequest }>({
    mutationFn: ({ comment }: { comment: AddCommentRequest }) => addCommentApi({ comment }),
    onSuccess: (data) => {
      queryClient.setQueryData([COMMENTS_QUERY_KEY, data?.postId], (old: any) => [...old, data])
    },
  })

  return { addComment, ...rest }
}

export default useAddCommentQuery

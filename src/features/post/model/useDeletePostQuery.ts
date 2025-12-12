import { useMutation, useQueryClient } from "@tanstack/react-query"
import deletePostApi from "../../../entities/post/api/deletePostApi"
import { Post } from "../../../entities/post/model/post"
import { POST_QUERY_KEY } from "../../../entities/post/model/usePostQuery"
import usePostParams from "../../../entities/post/model/usePostParams"

const useDeletePostQuery = () => {
  const queryClient = useQueryClient()
  const { params } = usePostParams()

  return useMutation<Post, Error, { id: number }>({
    mutationFn: ({ id }: { id: number }) => deletePostApi({ id }),
    onMutate: ({ id }: { id: number }) => {
      queryClient.setQueryData([POST_QUERY_KEY, params], (old: any) => ({
        ...old,
        posts: old.posts.filter((p: Post) => p.id !== id),
      }))
    },
  })
}

export default useDeletePostQuery

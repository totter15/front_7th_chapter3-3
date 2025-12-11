import { useMutation, useQueryClient } from "@tanstack/react-query"
import updatePostApi from "../../../entities/post/api/updatePostApi"
import { Post } from "../../../entities/post/model/post"
import { POST_QUERY_KEY } from "../../../entities/post/model/usePostQuery"
import usePostParams from "./usePostParams"

const useEditPostQuery = () => {
  const queryClient = useQueryClient()
  const { params } = usePostParams()
  const { mutate: updatePost } = useMutation<Post, Error, { post: Post }>({
    mutationFn: ({ post }: { post: Post }) => updatePostApi({ post }),
    onSuccess: (data) => {
      queryClient.setQueryData([POST_QUERY_KEY, params], (old: any) => ({
        ...old,
        posts: old.posts.map((p: Post) => (p.id === data.id ? { ...p, ...data } : p)),
      }))
    },
  })
  return { updatePost }
}

export default useEditPostQuery

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AddPostRequest } from "../../../entities/post/model/post"
import addPostApi from "../../../entities/post/api/addPostApi"
import { POST_QUERY_KEY } from "../../../entities/post/model/usePostQuery"
import usePostParams from "../../../entities/post/model/usePostParams"

const useAddPostQuery = () => {
  const queryClient = useQueryClient()
  const { params } = usePostParams()

  const { mutate: addPost } = useMutation<AddPostRequest, Error, { post: AddPostRequest }>({
    mutationFn: ({ post }: { post: AddPostRequest }) => addPostApi({ post }),
    onSuccess: (data) => {
      queryClient.setQueryData([POST_QUERY_KEY, params], (old: any) => ({
        ...old,
        posts: [data, ...old.posts],
      }))
    },
    onError: (error) => {
      console.error("게시물 추가 중 오류 발생:", error)
      alert(`게시물 추가에 실패했습니다: ${error.message}`)
    },
  })
  return { addPost }
}

export default useAddPostQuery

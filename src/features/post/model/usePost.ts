import { useCallback, useState } from "react"
import { AddPostRequest, Post } from "../../../entities/post/model/post"
import getPostsApi from "../../../entities/post/api/getPostsApi"
import usePostParams from "./usePostParams"
import getSearchPostsApi from "../../../entities/post/api/getSearchPostsApi"
import getTagPostsApi from "../../../entities/post/api/getTagPostsApi"
import getUsersApi from "../../../entities/user/api/getUsersApi"
import addPostApi from "../../../entities/post/api/addPostApi"
import updatePostApi from "../../../entities/post/api/updatePostApi"
import deletePostApi from "../../../entities/post/api/deletePostApi"

const usePost = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)

  const { params: postParams } = usePostParams()

  const getPosts = useCallback(async () => {
    setLoading(true)

    const postsData = await getPostsApi({ limit: postParams.limit, skip: postParams.skip })
    setPosts(postsData.posts)
    setTotal(postsData.total)

    setLoading(false)
  }, [postParams])

  const getSearchPosts = useCallback(async () => {
    if (!postParams.searchQuery) {
      getPosts()
      return
    }

    const postsData = await getSearchPostsApi({ searchQuery: postParams.searchQuery })
    setPosts(postsData.posts)
    setTotal(postsData.total)

    setLoading(false)
  }, [postParams])

  const getTagPosts = useCallback(async (tag: string) => {
    if (!tag || tag === "all") {
      getPosts()
      return
    }
    setLoading(true)
    try {
      const [postsData, usersData] = await Promise.all([getTagPostsApi({ tag }), getUsersApi()])
      const postsWithUsers = postsData.posts.map((post) => ({
        ...post,
        author: usersData.users.find((user) => user.id === post.userId),
      }))

      setPosts(postsWithUsers)
      setTotal(postsData.total)
    } catch (error) {
      console.error("태그별 게시물 가져오기 오류:", error)
    }
    setLoading(false)
  }, [])

  const addPost = useCallback(async (newPost: AddPostRequest) => {
    const data = await addPostApi({ post: newPost })
    setPosts((prev) => [data, ...prev])
  }, [])

  const updatePost = useCallback(async (post: Post) => {
    const data = await updatePostApi({ post })
    setPosts((prev) => prev.map((p) => (p.id === data.id ? data : p)))
  }, [])

  const deletePost = useCallback(async (id: number) => {
    await deletePostApi({ id })
    setPosts((prev) => prev.filter((post) => post.id !== id))
  }, [])

  return {
    data: { posts, total, loading },
    getPosts,
    getSearchPosts,
    getTagPosts,
    addPost,
    updatePost,
    deletePost,
  }
}

export default usePost

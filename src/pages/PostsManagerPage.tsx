import { useEffect, useState } from "react"
import { Plus, Search } from "lucide-react"
import { Button, Card, Input, Select } from "../shared/ui"
import PostTable from "../components/post/PostTable"
import getPostsApi from "../entities/post/api/getPostsApi"
import getTagsApi from "../entities/tag/api/getTagsApi"
import getSearchPostsApi from "../entities/post/api/getSearchPostsApi"
import getUsersApi from "../entities/user/api/getUsersApi"
import addPostApi from "../entities/post/api/addPostApi"
import updatePostApi from "../entities/post/api/updatePostApi"
import deletePostApi from "../entities/post/api/deletePostApi"
import getCommentsApi from "../entities/comment/api/getCommentsApi"
import addCommentApi from "../entities/comment/api/addCommentApi"
import updateCommentApi from "../entities/comment/api/updateCommentApi"
import deleteCommentApi from "../entities/comment/api/deleteCommentApi"
import likeCommentApi from "../entities/comment/api/likeCommentApi"
import getUserApi from "../entities/user/api/getUserApi"
import { Tag } from "../entities/tag/model/tag"
import { Comment } from "../entities/comment/model/comment"
import { Post } from "../entities/post/model/post"
import getTagPostsApi from "../entities/post/api/getTagPostsApi"
import { User } from "../entities/user/model/user"

import AddPostDialog from "../components/post/AddPostDialog"
import EditPostDialog from "../components/post/EditPostDialog"
import AddCommentDialog from "../components/post/AddCommentDialog"
import EditCommentDialog from "../components/post/EditCommentDialog"
import DetailPostDialog from "../components/post/DetailPostDialog"
import UserModal from "../components/post/UserModal"
import usePostParams from "../features/post/model/usePostParams"

const PostsManager = () => {
  // 상태 관리
  const [posts, setPosts] = useState<Post[]>([])
  const [total, setTotal] = useState(0)

  const [selectedPost, setSelectedPost] = useState<Post | null>(null)

  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [newPost, setNewPost] = useState({ title: "", body: "", userId: 1 })
  const [loading, setLoading] = useState(false)
  const [tags, setTags] = useState<Tag[]>([])
  const [comments, setComments] = useState<{ [key: number]: Comment[] }>({})
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null)
  const [newComment, setNewComment] = useState<{ body: string; postId: number | null; userId: number }>({
    body: "",
    postId: null,
    userId: 1,
  })
  const [showAddCommentDialog, setShowAddCommentDialog] = useState(false)
  const [showEditCommentDialog, setShowEditCommentDialog] = useState(false)
  const [showPostDetailDialog, setShowPostDetailDialog] = useState(false)
  const [showUserModal, setShowUserModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const { params: postParams, updateParams: updatePostParams } = usePostParams()

  // 게시물 가져오기
  const fetchPosts = async () => {
    setLoading(true)

    const postsData = await getPostsApi({ limit: postParams.limit, skip: postParams.skip })
    setPosts(postsData.posts)
    setTotal(postsData.total)

    setLoading(false)
  }

  // 태그 가져오기
  const fetchTags = async () => {
    const tags = await getTagsApi()
    setTags(tags)
  }

  // 게시물 검색
  const searchPosts = async () => {
    if (!postParams.searchQuery) {
      fetchPosts()
      return
    }

    setLoading(true)
    const postData = await getSearchPostsApi({ searchQuery: postParams.searchQuery })
    setPosts(postData.posts)
    setTotal(postData.total)
    setLoading(false)
  }

  // 태그별 게시물 가져오기
  const fetchPostsByTag = async (tag: string) => {
    if (!tag || tag === "all") {
      fetchPosts()
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
  }

  // 게시물 추가
  const addPost = async () => {
    const data = await addPostApi({ post: newPost })
    setPosts([data, ...posts])
    setShowAddDialog(false)
    setNewPost({ title: "", body: "", userId: 1 })
  }

  // 게시물 업데이트
  const updatePost = async () => {
    try {
      const data = await updatePostApi({ post: selectedPost })
      setPosts(posts.map((post) => (post.id === data.id ? data : post)))
      setShowEditDialog(false)
    } catch (error) {
      console.error("게시물 업데이트 오류:", error)
    }
  }

  // 게시물 삭제
  const deletePost = async (id: number) => {
    await deletePostApi({ id })
    setPosts(posts.filter((post) => post.id !== id))
  }

  // COMMENT
  // 댓글 가져오기
  const fetchComments = async (postId: number) => {
    if (comments[postId]) return // 이미 불러온 댓글이 있으면 다시 불러오지 않음
    const data = await getCommentsApi({ postId })
    setComments((prev) => ({ ...prev, [postId]: data.comments }))
  }

  // 댓글 추가
  const addComment = async () => {
    const data = await addCommentApi({ comment: newComment })
    if (data) {
      setComments((prev) => ({
        ...prev,
        [data.postId]: [...(prev[data.postId] || []), data],
      }))
    }

    setShowAddCommentDialog(false)
    setNewComment({ body: "", postId: null, userId: 1 })
  }

  // 댓글 업데이트
  const updateComment = async () => {
    const data = await updateCommentApi({ comment: selectedComment })
    setComments((prev) => ({
      ...prev,
      [data.postId]: prev[data.postId].map((comment) => (comment.id === data.id ? data : comment)),
    }))
    setShowEditCommentDialog(false)
  }

  // 댓글 삭제
  const deleteComment = async (id: number, postId: number) => {
    await deleteCommentApi({ id })
    setComments((prev) => ({
      ...prev,
      [postId]: prev[postId].filter((comment) => comment.id !== id),
    }))
  }

  // 댓글 좋아요
  const likeComment = async (id: number, postId: number) => {
    const currentComment = comments[postId].find((c) => c.id === id)

    if (!currentComment) return
    const data = await likeCommentApi({ id, likes: currentComment.likes + 1 })
    setComments((prev) => ({
      ...prev,
      [postId]: prev[postId].map((comment) =>
        comment.id === data.id ? { ...data, likes: comment.likes + 1 } : comment,
      ),
    }))
  }

  // POST
  // 게시물 상세 보기
  const openPostDetail = (post: Post) => {
    setSelectedPost(post)
    fetchComments(post.id)
    setShowPostDetailDialog(true)
  }

  // 사용자 모달 열기
  const openUserModal = async (user: User) => {
    const userData = await getUserApi({ id: user.id })

    if (userData) {
      setSelectedUser(userData)
      setShowUserModal(true)
    }
  }

  useEffect(() => {
    fetchTags()
  }, [])

  useEffect(() => {
    if (postParams.selectedTag) {
      fetchPostsByTag(postParams.selectedTag)
    } else {
      fetchPosts()
    }
  }, [postParams])

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <Card.Header>
        <Card.Title className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <Button onClick={() => setShowAddDialog(true)}>
            <Plus className="w-4 h-4 mr-2" />
            게시물 추가
          </Button>
        </Card.Title>
      </Card.Header>

      <Card.Content>
        <div className="flex flex-col gap-4">
          {/* 검색 및 필터 컨트롤 */}
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="게시물 검색..."
                  className="pl-8"
                  value={postParams.searchQuery}
                  onChange={(e) => updatePostParams({ searchQuery: e.target.value })}
                  onKeyPress={(e) => e.key === "Enter" && searchPosts()}
                />
              </div>
            </div>
            <Select
              value={postParams.selectedTag}
              onValueChange={(value) => {
                updatePostParams({ selectedTag: value })
              }}
            >
              <Select.Trigger className="w-[180px]">
                <Select.Value placeholder="태그 선택" />
              </Select.Trigger>
              <Select.Content>
                <Select.Item value="all">모든 태그</Select.Item>
                {tags.map((tag) => (
                  <Select.Item key={tag.url} value={tag.slug}>
                    {tag.slug}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select>
            <Select value={postParams.sortBy} onValueChange={(value) => updatePostParams({ sortBy: value })}>
              <Select.Trigger className="w-[180px]">
                <Select.Value placeholder="정렬 기준" />
              </Select.Trigger>
              <Select.Content>
                <Select.Item value="none">없음</Select.Item>
                <Select.Item value="id">ID</Select.Item>
                <Select.Item value="title">제목</Select.Item>
                <Select.Item value="reactions">반응</Select.Item>
              </Select.Content>
            </Select>
            <Select value={postParams.sortOrder} onValueChange={(value) => updatePostParams({ sortOrder: value })}>
              <Select.Trigger className="w-[180px]">
                <Select.Value placeholder="정렬 순서" />
              </Select.Trigger>
              <Select.Content>
                <Select.Item value="asc">오름차순</Select.Item>
                <Select.Item value="desc">내림차순</Select.Item>
              </Select.Content>
            </Select>
          </div>

          {/* 게시물 테이블 */}
          {loading ? (
            <div className="flex justify-center p-4">로딩 중...</div>
          ) : (
            <PostTable
              posts={posts}
              setSelectedPost={setSelectedPost}
              selectedTag={postParams.selectedTag}
              setSelectedTag={(value) => updatePostParams({ selectedTag: value })}
              setShowEditDialog={setShowEditDialog}
              searchQuery={postParams.searchQuery}
              openPostDetail={openPostDetail}
              openUserModal={openUserModal}
              deletePost={deletePost}
            />
          )}
          {/* 페이지네이션 */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span>표시</span>
              <Select
                value={postParams.limit.toString()}
                onValueChange={(value) => updatePostParams({ limit: Number(value) })}
              >
                <Select.Trigger className="w-[180px]">
                  <Select.Value placeholder="10" />
                </Select.Trigger>
                <Select.Content>
                  <Select.Item value="10">10</Select.Item>
                  <Select.Item value="20">20</Select.Item>
                  <Select.Item value="30">30</Select.Item>
                </Select.Content>
              </Select>
              <span>항목</span>
            </div>{" "}
            <div className="flex gap-2">
              <Button
                disabled={postParams.skip === 0}
                onClick={() => updatePostParams({ skip: Math.max(0, postParams.skip - postParams.limit) })}
              >
                이전
              </Button>
              <Button
                disabled={postParams.skip + postParams.limit >= total}
                onClick={() => updatePostParams({ skip: postParams.skip + postParams.limit })}
              >
                다음
              </Button>
            </div>
          </div>
        </div>
      </Card.Content>

      {/* 게시물 추가 대화상자 */}
      <AddPostDialog
        showAddDialog={showAddDialog}
        setShowAddDialog={setShowAddDialog}
        newPost={newPost}
        setNewPost={setNewPost}
        addPost={addPost}
      />

      {/* 게시물 수정 대화상자 */}
      <EditPostDialog
        showEditDialog={showEditDialog}
        setShowEditDialog={setShowEditDialog}
        selectedPost={selectedPost}
        setSelectedPost={setSelectedPost}
        updatePost={updatePost}
      />

      {/* 댓글 추가 대화상자 */}
      <AddCommentDialog
        showAddCommentDialog={showAddCommentDialog}
        setShowAddCommentDialog={setShowAddCommentDialog}
        newComment={newComment}
        setNewComment={setNewComment}
        addComment={addComment}
      />

      {/* 댓글 수정 대화상자 */}
      <EditCommentDialog
        showEditCommentDialog={showEditCommentDialog}
        setShowEditCommentDialog={setShowEditCommentDialog}
        selectedComment={selectedComment}
        setSelectedComment={setSelectedComment}
        updateComment={updateComment}
      />

      {/* 게시물 상세 보기 대화상자 */}
      <DetailPostDialog
        showPostDetailDialog={showPostDetailDialog}
        setShowPostDetailDialog={setShowPostDetailDialog}
        selectedPost={selectedPost}
        searchQuery={postParams.searchQuery}
        comments={comments}
        setNewComment={setNewComment}
        setShowAddCommentDialog={setShowAddCommentDialog}
        likeComment={likeComment}
        deleteComment={deleteComment}
        setSelectedComment={setSelectedComment}
        setShowEditCommentDialog={setShowEditCommentDialog}
      />

      {/* 사용자 모달 */}
      <UserModal showUserModal={showUserModal} setShowUserModal={setShowUserModal} selectedUser={selectedUser} />
    </Card>
  )
}

export default PostsManager

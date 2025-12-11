import { useEffect, useState } from "react"
import { Plus } from "lucide-react"
import { Button, Card } from "../shared/ui"
import getTagsApi from "../entities/tag/api/getTagsApi"
import getUserApi from "../entities/user/api/getUserApi"
import { Tag } from "../entities/tag/model/tag"
import { Comment, AddCommentRequest } from "../entities/comment/model/comment"
import { AddPostRequest, Post } from "../entities/post/model/post"
import { User } from "../entities/user/model/user"

import AddPostDialog from "../features/post/ui/AddPostDialog"
import EditPostDialog from "../features/post/ui/EditPostDialog"
import AddCommentDialog from "../components/post/AddCommentDialog"
import EditCommentDialog from "../components/post/EditCommentDialog"
import DetailPostDialog from "../components/post/DetailPostDialog"
import UserModal from "../components/post/UserModal"
import usePostParams from "../features/post/model/usePostParams"
import usePost from "../features/post/model/usePost"
import PostContent from "../widgets/post/PostContent"
import useComment from "../features/comment/model/useComment"

const PostsManager = () => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)

  const [showPostDetailDialog, setShowPostDetailDialog] = useState(false)
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null)
  const [showAddCommentDialog, setShowAddCommentDialog] = useState(false)
  const [showEditCommentDialog, setShowEditCommentDialog] = useState(false)

  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [showUserModal, setShowUserModal] = useState(false)

  const { params: postParams } = usePostParams()

  const [tags, setTags] = useState<Tag[]>([])

  const {
    data: { posts, total, loading },
    getPosts,
    getSearchPosts,
    getTagPosts,
    addPost,
    updatePost,
    deletePost,
  } = usePost()

  const { comments, getComments, addComment, updateComment, deleteComment, likeComment } = useComment()

  // 태그 가져오기
  const fetchTags = async () => {
    const tags = await getTagsApi()
    setTags(tags)
  }

  // 게시물 추가
  const handleAddPost = async (newPost: AddPostRequest) => {
    addPost(newPost)
    setShowAddDialog(false)
  }

  // 게시물 업데이트
  const handleUpdatePost = async () => {
    if (!selectedPost) return
    updatePost(selectedPost)
    setShowEditDialog(false)
  }

  // COMMENT
  // 댓글 추가
  const handleAddComment = async (newComment: AddCommentRequest) => {
    addComment(newComment)
    setShowAddCommentDialog(false)
  }

  // 댓글 업데이트
  const handleUpdateComment = async () => {
    if (!selectedComment) return
    updateComment(selectedComment)
    setShowEditCommentDialog(false)
  }

  // POST
  // 게시물 상세 보기
  const openPostDetail = (post: Post) => {
    setSelectedPost(post)
    getComments(post.id)
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
    getPosts()
    fetchTags()
  }, [])

  useEffect(() => {
    if (postParams.selectedTag) {
      getTagPosts(postParams.selectedTag)
    } else {
      getPosts()
    }
  }, [postParams, getTagPosts, getPosts])

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
        <PostContent
          posts={posts}
          loading={loading}
          getSearchPosts={getSearchPosts}
          tags={tags}
          setSelectedPost={setSelectedPost}
          setShowEditDialog={setShowEditDialog}
          openPostDetail={openPostDetail}
          openUserModal={openUserModal}
          deletePost={deletePost}
          total={total}
        />
      </Card.Content>

      {/* 게시물 추가 */}
      <AddPostDialog showAddDialog={showAddDialog} setShowAddDialog={setShowAddDialog} addPost={handleAddPost} />

      {/* 게시물 수정 */}
      <EditPostDialog
        showEditDialog={showEditDialog}
        setShowEditDialog={setShowEditDialog}
        selectedPost={selectedPost}
        setSelectedPost={setSelectedPost}
        updatePost={handleUpdatePost}
      />

      {/* 사용자 모달 */}
      <UserModal showUserModal={showUserModal} setShowUserModal={setShowUserModal} selectedUser={selectedUser} />

      {/* 게시물 상세 보기  */}
      <DetailPostDialog
        showPostDetailDialog={showPostDetailDialog}
        setShowPostDetailDialog={setShowPostDetailDialog}
        selectedPost={selectedPost}
        searchQuery={postParams.searchQuery}
        comments={comments}
        setShowAddCommentDialog={setShowAddCommentDialog}
        likeComment={likeComment}
        deleteComment={deleteComment}
        setSelectedComment={setSelectedComment}
        setShowEditCommentDialog={setShowEditCommentDialog}
      />

      {/* 댓글 추가 */}
      <AddCommentDialog
        showAddCommentDialog={showAddCommentDialog}
        setShowAddCommentDialog={setShowAddCommentDialog}
        addComment={handleAddComment}
        postId={selectedPost?.id ?? 0}
      />

      {/* 댓글 수정 */}
      <EditCommentDialog
        showEditCommentDialog={showEditCommentDialog}
        setShowEditCommentDialog={setShowEditCommentDialog}
        selectedComment={selectedComment}
        setSelectedComment={setSelectedComment}
        updateComment={handleUpdateComment}
      />
    </Card>
  )
}

export default PostsManager

import { useEffect, useState } from "react"
import { Plus } from "lucide-react"
import { Button, Card } from "../../shared/ui"
import getTagsApi from "../../entities/tag/api/getTagsApi"
import getUserApi from "../../entities/user/api/getUserApi"
import { Tag } from "../../entities/tag/model/tag"
import { Post } from "../../entities/post/model/post"
import { User } from "../../entities/user/model/user"

import AddPostDialog from "../../features/post/ui/AddPostDialog"
import EditPostDialog from "../../features/post/ui/EditPostDialog"
import AddCommentDialog from "../../features/comment/ui/AddCommentDialog"
import EditCommentDialog from "../../features/comment/ui/EditCommentDialog"
import DetailPostDialog from "./DetailPostDialog"
import UserModal from "../../entities/user/ui/UserModal"
import usePostParams from "../../features/post/model/usePostParams"
import usePost from "../../features/post/model/usePost"
import PostContent from "../../widgets/post/PostContent"
import useComment from "../../features/comment/model/useComment"
import { useAddPostDialogStore } from "../../features/post/model/useAddPostDialogStore"
import { useSelectedPostStore } from "../../features/post/model/useSelectedPostStore"

const PostsManager = () => {
  const setShowAddDialog = useAddPostDialogStore((state) => state.setShowDialog)
  const selectedPost = useSelectedPostStore((state) => state.selectedPost)
  const setSelectedPost = useSelectedPostStore((state) => state.setSelectedPost)

  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [showUserModal, setShowUserModal] = useState(false)
  const [showPostDetailDialog, setShowPostDetailDialog] = useState(false)

  const { params: postParams } = usePostParams()

  const [tags, setTags] = useState<Tag[]>([])

  const { getPosts, getTagPosts } = usePost()

  const { comments, getComments } = useComment()

  // 태그 가져오기
  const fetchTags = async () => {
    const tags = await getTagsApi()
    setTags(tags)
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
        <PostContent tags={tags} openPostDetail={openPostDetail} openUserModal={openUserModal} />
      </Card.Content>

      {/* 게시물 상세 보기  */}
      <DetailPostDialog
        showPostDetailDialog={showPostDetailDialog}
        setShowPostDetailDialog={setShowPostDetailDialog}
        comments={comments}
      />

      {/* 댓글 추가 */}
      <AddCommentDialog postId={selectedPost?.id ?? 0} />

      {/* 댓글 수정 */}
      <EditCommentDialog />

      {/* 게시물 추가 */}
      <AddPostDialog />

      {/* 게시물 수정 */}
      <EditPostDialog />

      {/* 사용자 모달 */}
      <UserModal showUserModal={showUserModal} setShowUserModal={setShowUserModal} selectedUser={selectedUser} />
    </Card>
  )
}

export default PostsManager

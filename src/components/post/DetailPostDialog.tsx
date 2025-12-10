import { Dialog } from ".."
import HighlightText from "../HighlightText"
import Comments from "./Comments"
import { Post } from "../../types/post"
import { Comment } from "../../types/comment"

const DetailPostDialog = ({
  showPostDetailDialog,
  setShowPostDetailDialog,
  selectedPost,
  searchQuery,
  comments,
  setNewComment,
  setShowAddCommentDialog,
  likeComment,
  deleteComment,
  setSelectedComment,
  setShowEditCommentDialog,
}: {
  showPostDetailDialog: boolean
  setShowPostDetailDialog: (show: boolean) => void
  selectedPost: Post | null
  searchQuery: string
  comments: { [key: number]: Comment[] }
  setNewComment: (comment: { body: string; postId: number | null; userId: number }) => void
  setShowAddCommentDialog: (show: boolean) => void
  likeComment: (id: number, postId: number) => void
  deleteComment: (id: number, postId: number) => void
  setSelectedComment: (comment: Comment) => void
  setShowEditCommentDialog: (show: boolean) => void
}) => {
  if (!selectedPost) return <></>

  return (
    <Dialog open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog}>
      <Dialog.Content className="max-w-3xl">
        <Dialog.Header>
          <Dialog.Title>
            <HighlightText text={selectedPost?.title} highlight={searchQuery} />
          </Dialog.Title>
        </Dialog.Header>
        <div className="space-y-4">
          <p>
            <HighlightText text={selectedPost?.body} highlight={searchQuery} />
          </p>
          <Comments
            postId={selectedPost?.id}
            comments={comments[selectedPost?.id]}
            setNewComment={setNewComment}
            setShowAddCommentDialog={setShowAddCommentDialog}
            likeComment={likeComment}
            deleteComment={deleteComment}
            setSelectedComment={setSelectedComment}
            setShowEditCommentDialog={setShowEditCommentDialog}
            searchQuery={searchQuery}
          />
        </div>
      </Dialog.Content>
    </Dialog>
  )
}

export default DetailPostDialog

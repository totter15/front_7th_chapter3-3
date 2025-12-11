import { useState } from "react"
import { Dialog, Textarea, Button } from "../../shared/ui/index"
import { AddCommentRequest } from "../../entities/comment/model/comment"

const AddCommentDialog = ({
  showAddCommentDialog,
  setShowAddCommentDialog,
  addComment,
  postId,
}: {
  showAddCommentDialog: boolean
  setShowAddCommentDialog: (show: boolean) => void
  addComment: (comment: AddCommentRequest) => void
  postId: number
}) => {
  const [newComment, setNewComment] = useState<AddCommentRequest>({
    body: "",
    postId,
    userId: 1,
  })

  return (
    <Dialog open={showAddCommentDialog} onOpenChange={setShowAddCommentDialog}>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>새 댓글 추가</Dialog.Title>
        </Dialog.Header>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={newComment.body}
            onChange={(e) => setNewComment({ ...newComment, postId, body: e.target.value })}
          />
          <Button onClick={() => addComment(newComment)}>댓글 추가</Button>
        </div>
      </Dialog.Content>
    </Dialog>
  )
}

export default AddCommentDialog

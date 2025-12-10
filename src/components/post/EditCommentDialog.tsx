import { Dialog, Textarea, Button } from "../../shared/ui"
import { Comment } from "../../entities/comment/model/comment"

const EditCommentDialog = ({
  showEditCommentDialog,
  setShowEditCommentDialog,
  selectedComment,
  setSelectedComment,
  updateComment,
}: {
  showEditCommentDialog: boolean
  setShowEditCommentDialog: (show: boolean) => void
  selectedComment: Comment | null
  setSelectedComment: (comment: Comment) => void
  updateComment: () => void
}) => {
  return (
    <Dialog open={showEditCommentDialog} onOpenChange={setShowEditCommentDialog}>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>댓글 수정</Dialog.Title>
        </Dialog.Header>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={selectedComment?.body || ""}
            onChange={(e) => setSelectedComment({ ...selectedComment, body: e.target.value } as Comment)}
          />
          <Button onClick={updateComment}>댓글 업데이트</Button>
        </div>
      </Dialog.Content>
    </Dialog>
  )
}

export default EditCommentDialog

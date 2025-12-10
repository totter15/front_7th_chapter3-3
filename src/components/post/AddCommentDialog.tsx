import { Dialog, Textarea, Button } from "../../shared/ui/index"

const AddCommentDialog = ({
  showAddCommentDialog,
  setShowAddCommentDialog,
  newComment,
  setNewComment,
  addComment,
}: {
  showAddCommentDialog: boolean
  setShowAddCommentDialog: (show: boolean) => void
  newComment: { body: string; postId: number | null; userId: number }
  setNewComment: (comment: { body: string; postId: number | null; userId: number }) => void
  addComment: () => void
}) => {
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
            onChange={(e) => setNewComment({ ...newComment, body: e.target.value })}
          />
          <Button onClick={addComment}>댓글 추가</Button>
        </div>
      </Dialog.Content>
    </Dialog>
  )
}

export default AddCommentDialog

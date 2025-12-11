import { Button } from "../../shared/ui/index"
import { Plus } from "lucide-react"
import { Comment } from "../../entities/comment/model/comment"
import CommentItem from "./CommentItem"
import { useAddCommentDialogStore } from "../../features/comment/model/useAddCommentDialogStore"

const Comments = ({ comments }: { comments: Comment[] }) => {
  const setShowAddCommentDialog = useAddCommentDialogStore((state) => state.setShowDialog)

  const handleAddComment = () => {
    setShowAddCommentDialog(true)
  }
  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <Button size="sm" onClick={handleAddComment}>
          <Plus className="w-3 h-3 mr-1" />
          댓글 추가
        </Button>
      </div>

      <div className="space-y-1">
        {comments?.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  )
}
export default Comments

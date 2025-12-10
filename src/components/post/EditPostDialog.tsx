import { Dialog, Input, Textarea, Button } from "../../shared/ui/index"
import { Post } from "../../entities/post/model/post"

const EditPostDialog = ({
  showEditDialog,
  setShowEditDialog,
  selectedPost,
  setSelectedPost,
  updatePost,
}: {
  showEditDialog: boolean
  setShowEditDialog: (show: boolean) => void
  selectedPost: Post | null
  setSelectedPost: (post: Post) => void
  updatePost: () => void
}) => {
  if (!selectedPost) return <></>

  return (
    <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>게시물 수정</Dialog.Title>
        </Dialog.Header>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={selectedPost?.title || ""}
            onChange={(e) => setSelectedPost({ ...selectedPost, title: e.target.value })}
          />
          <Textarea
            rows={15}
            placeholder="내용"
            value={selectedPost?.body || ""}
            onChange={(e) => setSelectedPost({ ...selectedPost, body: e.target.value })}
          />
          <Button onClick={updatePost}>게시물 업데이트</Button>
        </div>
      </Dialog.Content>
    </Dialog>
  )
}

export default EditPostDialog

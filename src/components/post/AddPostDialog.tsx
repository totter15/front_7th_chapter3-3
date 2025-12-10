import { Input, Textarea, Button, Dialog } from "../index"

const AddPostDialog = ({
  showAddDialog,
  setShowAddDialog,
  newPost,
  setNewPost,
  addPost,
}: {
  showAddDialog: boolean
  setShowAddDialog: (show: boolean) => void
  newPost: { title: string; body: string; userId: number }
  setNewPost: (post: { title: string; body: string; userId: number }) => void
  addPost: () => void
}) => {
  return (
    <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>새 게시물 추가</Dialog.Title>
        </Dialog.Header>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          />
          <Textarea
            rows={30}
            placeholder="내용"
            value={newPost.body}
            onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
          />
          <Input
            type="number"
            placeholder="사용자 ID"
            value={newPost.userId}
            onChange={(e) => setNewPost({ ...newPost, userId: Number(e.target.value) })}
          />
          <Button onClick={addPost}>게시물 추가</Button>
        </div>
      </Dialog.Content>
    </Dialog>
  )
}

export default AddPostDialog

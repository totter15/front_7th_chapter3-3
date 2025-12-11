import { Dialog } from "../../shared/ui"
import HighlightText from "../../shared/ui/HighlightText"
import Comments from "../../widgets/comment/Comments"
import { Comment } from "../../entities/comment/model/comment"
import { useSelectedPostStore } from "../../features/post/model/useSelectedPostStore"
import usePostParams from "../../features/post/model/usePostParams"

const DetailPostDialog = ({
  showPostDetailDialog,
  setShowPostDetailDialog,
  comments,
}: {
  showPostDetailDialog: boolean
  setShowPostDetailDialog: (show: boolean) => void
  comments: { [key: number]: Comment[] }
}) => {
  const { params } = usePostParams()
  const selectedPost = useSelectedPostStore((state) => state.selectedPost)
  if (!selectedPost) return <></>

  return (
    <Dialog open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog}>
      <Dialog.Content className="max-w-3xl">
        <Dialog.Header>
          <Dialog.Title>
            <HighlightText text={selectedPost?.title} highlight={params.searchQuery} />
          </Dialog.Title>
        </Dialog.Header>
        <div className="space-y-4">
          <p>
            <HighlightText text={selectedPost?.body} highlight={params.searchQuery} />
          </p>
          <Comments comments={comments[selectedPost?.id]} />
        </div>
      </Dialog.Content>
    </Dialog>
  )
}

export default DetailPostDialog

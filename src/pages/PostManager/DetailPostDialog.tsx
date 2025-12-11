import { Dialog } from "../../shared/ui"
import HighlightText from "../../shared/ui/HighlightText"
import Comments from "../../widgets/comment/Comments"
import { useSelectedPostStore } from "../../features/post/model/useSelectedPostStore"
import usePostParams from "../../features/post/model/usePostParams"

const DetailPostDialog = ({
  showPostDetailDialog,
  setShowPostDetailDialog,
}: {
  showPostDetailDialog: boolean
  setShowPostDetailDialog: (show: boolean) => void
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
          <Comments postId={selectedPost?.id || 0} />
        </div>
      </Dialog.Content>
    </Dialog>
  )
}

export default DetailPostDialog

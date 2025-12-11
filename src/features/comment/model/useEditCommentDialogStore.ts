import { create } from "zustand"
import { Comment } from "../../../entities/comment/model/comment"

interface EditCommentDialogStore {
  showDialog: boolean
  setShowDialog: (show: boolean) => void
  selectedComment: Comment | null
  setSelectedComment: (comment: Comment) => void
}

export const useEditCommentDialogStore = create<EditCommentDialogStore>((set) => ({
  showDialog: false,
  setShowDialog: (show: boolean) => set({ showDialog: show }),
  selectedComment: null,
  setSelectedComment: (comment: Comment) => set({ selectedComment: comment }),
}))

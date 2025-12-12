import { create } from "zustand"
import { Comment } from "../../../entities/comment/model/comment"

interface SelectedCommentStore {
  selectedComment: Comment | null
  setSelectedComment: (comment: Comment | null) => void
}

export const useSelectedCommentStore = create<SelectedCommentStore>((set) => ({
  selectedComment: null,
  setSelectedComment: (comment: Comment | null) => set({ selectedComment: comment }),
}))

import { create } from "zustand"

interface AddCommentDialogStore {
  showDialog: boolean
  setShowDialog: (show: boolean) => void
}

export const useAddCommentDialogStore = create<AddCommentDialogStore>((set) => ({
  showDialog: false,
  setShowDialog: (show: boolean) => set({ showDialog: show }),
}))

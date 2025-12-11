import { create } from "zustand"
import { User } from "./user"

interface SelectedUserStore {
  selectedUser: User | null
  setSelectedUser: (user: User | null) => void
}

const useSelectedUserStore = create<SelectedUserStore>((set) => ({
  selectedUser: null,
  setSelectedUser: (user: User | null) => set({ selectedUser: user }),
}))

export default useSelectedUserStore

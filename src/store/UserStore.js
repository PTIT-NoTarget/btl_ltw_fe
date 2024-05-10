import { create } from "zustand";

export const useUserStore = create((set) => ({
  userList: [],
  setUserList: (userList) => set({ userList: userList }),
}));
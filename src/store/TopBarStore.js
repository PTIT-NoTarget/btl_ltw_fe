import { create } from "zustand";

export const useTopBarStore = create((set) => ({
  leftTitle: "Ngo Dang Han",
  rightTitle: "",
  setLeftTitle: (title) => set({ leftTitle: title }),
  setRightTitle: (title) => set({ rightTitle: title }),
}));
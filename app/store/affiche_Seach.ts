import { create } from "zustand";

interface BarreType {
  seach: boolean;
  ouvire: () => void;
  ferme: () => void;
}

const useSeachStore = create<BarreType>((set) => ({
  seach: false,
  ouvire: () => set({ seach: true }),
  ferme: () => set({ seach: false }),
}));

export default useSeachStore;

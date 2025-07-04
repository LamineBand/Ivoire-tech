import { create } from "zustand";
type NombrePanier = {
  nbr: number;
  AddNombrePanier: () => void;
};
export const NombrePanier = create<NombrePanier>((set) => ({
  nbr: 0,
  AddNombrePanier: () => set((state) => ({ nbr: state.nbr + 1 })),
}));

import { create } from "zustand";
import { persist } from "zustand/middleware";

type storeType = {
  Store_P: ProduitType1[];
  AddStore_P: (elem: ProduitType1) => void;
  nbrPanier: number;
  increment: () => void;
  vider: () => void;
  addQte: (id: string) => void;
  retQte: (id: string) => void;
  supp: (id: string) => void;
};

export const Store_Panier = create<storeType>()(
  persist(
    (set) => ({
      Store_P: [],
      AddStore_P: (elem: ProduitType1) =>
        set((state) => {
          const exist = state.Store_P.find((item) => item._id === elem._id);
          if (exist) {
            return {
              Store_P: state.Store_P.map((item) =>
                item._id === elem._id ? { ...item, qte: item.qte + 1 } : item
              ),
            };
          } else {
            return {
              Store_P: [...state.Store_P, { ...elem, qte: 1 }],
            };
          }
        }),
      nbrPanier: 0,
      increment: () => set((state) => ({ nbrPanier: state.nbrPanier + 1 })),
      vider: () =>
        set((state) => ({
          Store_P: (state.Store_P = []),
          nbrPanier: (state.nbrPanier = 0),
        })),
      addQte: (id: string) =>
        set((state) => ({
          Store_P: state.Store_P.map((item) =>
            item._id === id ? { ...item, qte: item.qte + 1 } : item
          ),
        })),

      retQte: (id: string) =>
        set((state) => ({
          Store_P: state.Store_P.map((item) =>
            item._id === id ? { ...item, qte: item.qte - 1 } : item
          ),
        })),
      supp: (id: string) =>
        set((state) => ({
          Store_P: state.Store_P.filter((item) => item._id !== id),
          nbrPanier: state.nbrPanier - 1,
        })),
    }),
    {
      name: "panier-storage", // clé dans localStorage
      //  getStorage: () => localStorage, // facultatif, localStorage par défaut
    }
  )
);

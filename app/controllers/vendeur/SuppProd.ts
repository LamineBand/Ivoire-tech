"use client";
import Produit from "@/app/pages/dash/vendeur/produit/page";
import axios from "axios";
import { toast } from "react-toastify";

export async function SuppProd(
  e: React.FormEvent<HTMLFormElement>,
  id: string,
  produit: Produit[],
  setProduits: React.Dispatch<React.SetStateAction<Produit[]>>
) {
  e.preventDefault();
  try {
    console.log("id du produit à supprimer =", id);
    const req = await axios.delete("/api/supProduit", {
      data: { id },
    });
    if (req.data.mess === "ok") {
      toast.success("Produit supprimer avec succès !");
      console.log("la supp est ok");
      const tab = produit.filter((item) => item._id !== id);
      setProduits(tab);
    } else {
      console.log("les données ne sont pas aller ");
    }
  } catch (error) {
    console.error(error);
  }
}

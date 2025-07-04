import Produit from "@/app/pages/dash/vendeur/produit/page";
import axios from "axios";
import { toast } from "react-toastify";

export async function ModifProduit(
  e: React.FormEvent<HTMLFormElement>,
  identV: string,
  id: string,
  nouv_nomProduit: string,
  nouv_stockProduit: number,
  nouv_prixProduit: number,
  nouv_categorieProduit: string,
  nouv_descriptionProduit: string,
  nouv_imageProduit: File | null,
  setloadmodif: React.Dispatch<React.SetStateAction<boolean>>,
  setmodifProd: React.Dispatch<React.SetStateAction<Produit | undefined>>,
  produits: Produit[]
) {
  try {
    e.preventDefault();
    setloadmodif(true);
    console.log("Dans controller nouveau nom de produit =====");

    console.log(nouv_nomProduit);
    console.log("id du produit a modifier =====");
    console.log(id);
    const data = {
      id,
      identV,
      nouv_nomProduit,
      nouv_stockProduit,
      nouv_prixProduit,
      nouv_categorieProduit,
      nouv_descriptionProduit,
    };
    const req = await axios.patch("/api/modifProduit", data);
    if (req && req.data.mess === "ok") {
      setloadmodif(false);
      toast.success("Produit modifier avec succès !");
      console.log("envoi au back pour modifier");
      console.log("produit qu'on veut filtrer =");
      for (let index = 0; index < produits.length; index++) {
        if (produits[index]._id === id) {
          produits[index] = {
            _id: data.id,
            vendeur_id: data.identV,
            nomProduit: data.nouv_nomProduit,
            prixProduit: data.nouv_prixProduit,
            categorieProduit: data.nouv_categorieProduit,
            stockProduit: data.nouv_stockProduit,
            descriptionProduit: data.nouv_descriptionProduit,
          };
          break;
        }
      }

      /*  setmodifProd({
        _id: id,
        identV: identV,
        nomProduit: nouv_nomProduit,
        stockProduit: nouv_stockProduit,
        prixProduit: nouv_prixProduit,
        categorieProduit: nouv_categorieProduit,
        descriptionProduit: nouv_descriptionProduit,
        // ⚠️ imageProduit : à ajuster si tu récupères l’URL de l’image après upload.
      });*/
    }
  } catch (error) {
    setloadmodif(false);
    console.log("erreur de modification");
    console.log(error);
  }
}

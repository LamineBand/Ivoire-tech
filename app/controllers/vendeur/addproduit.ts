import Produit from "@/app/pages/dash/vendeur/produit/page";
import axios from "axios";
import { toast } from "react-toastify";

export async function Addproduit(
  vendeur_id: string,
  nomProduit: string,
  stockProduit: number,
  prixProduit: number,
  categorieProduit: string,
  descriptionProduit: string,
  imageProduit: string,
  setmess: React.Dispatch<React.SetStateAction<string>>,
  setload: React.Dispatch<React.SetStateAction<boolean>>,
  produits: Produit[],
  setProduits: React.Dispatch<React.SetStateAction<Produit[]>>
) {
  try {
    setmess("");
    setload(true);
    console.log("id vendeur recupere dans add");
    console.log(vendeur_id);

    const data = {
      vendeur_id,
      nomProduit,
      stockProduit,
      prixProduit,
      categorieProduit,
      descriptionProduit,
      imageProduit,
    };
    console.log("objet qui est  envoyer au back =");
    console.log(data);
    const req = await axios.post("/api/addproduit", data);
    if (req && req.data.mess === "ok") {
      setload(false);
      const rep = req.data.produit;
      console.log("reponse de sauvegarde ====");
      console.log(rep);
      setProduits([...produits, data]);
      toast.success("Produit ajouter avec succès !");
    } else {
      setload(false);
      setmess(req.data.mess);
      toast.error("Ajout de produit a échouer");
    }
  } catch (error) {
    setload(false);
    console.log("L'ajout de produit a echouer");
    setmess("L'ajout de produit a echouer");
    console.log(error);
  }
}

import axios from "axios";

export async function ValiderCommande(
  commande: CommandeType,
  setload: React.Dispatch<React.SetStateAction<boolean>>,
  setmess: React.Dispatch<React.SetStateAction<string>>,
  setvideur: React.Dispatch<React.SetStateAction<boolean>>
) {
  try {
    setload(false);
    setmess("");
    console.log("recupération de commande dans le controleur =");
    console.log(commande);
    if (
      commande &&
      commande.userinfo &&
      Array.isArray(commande.produits) &&
      commande.produits.length > 0 &&
      typeof commande.total === "number" &&
      commande.total > 0
    ) {
      const req = await axios.post("/api/checkout/", commande);
      if (req && req.data.mess === "ok") {
        setload(true);
        console.log("reçu au back");
        setvideur(true);
        alert("Commande Valider");
      } else {
        setload(true);
        console.log("erreur dans le back");
        setmess(req.data.mess);
      }
    } else {
      setload(true);
      alert("Vous ne pouvez pas valider un panier vide");
    }
  } catch (error) {
    setload(true);
    console.log("Erreur lord de la validation de la commande = ");
    console.log(error);
    setmess("Une erreur est survenue");
  }
}

interface ProduitType1 {
  _id?: string;
  nomProduit: string;
  prixProduit: number;
  categorieProduit: string;
  stockProduit: number;
  descriptionProduit: string;
  imageProduit?: string;
  vendeur_id: string;
  qte: number;
}
interface ClientType {
  uid: string;
  nom: string;
  tel: string;
  adresse: string;
  ville: string;
}
interface CommandeType {
  userinfo: ClientType;
  produits: ProduitType1[];
  total: number;
  // adresse: string;
  statut: string;
}

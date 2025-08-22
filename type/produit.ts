export interface ProduitType1 {
  _id?: string;
  nomProduit: string;
  prixProduit: number;
  categorieProduit: string;
  stockProduit: number;
  descriptionProduit: string;
  imageProduit?: string;
  vendeur_id: string;
  qte: number;
  statut: string;
}
export interface ClientType {
  uid: string;
  nom: string;
  tel: string;
  adresse: string;
  ville: string;
}
export interface CommandeType {
  ref: string;
  date: string;
  userinfo: ClientType;
  produits: ProduitType1[];
  total: number;
  // adresse: string;
  statut: string;
}
export interface cmdfiltre {
  ref: string;
  date: string;
  clientInfo: ClientType;
  produits: ProduitType1[];
  //total: number;
  // adresse: string;
  statut: string;
}

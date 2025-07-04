import { Schema, model, models } from "mongoose";

const produitschema = new Schema({
  vendeur_id: { type: String },
  nomProduit: { type: String },
  stockProduit: { type: Number },
  prixProduit: { type: Number },
  categorieProduit: { type: String },
  descriptionProduit: { type: String },
  imageProduit: { type: String },
});

const Produits_Model = models.Produits || model("Produits", produitschema);

export default Produits_Model;

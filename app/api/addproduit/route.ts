import Produits_Model from "@/app/model/produit_model";
import { MongoConnect } from "@/lib/mongoConnect";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await MongoConnect(); // Si nécessaire

    const {
      vendeur_id,
      nomProduit,
      stockProduit,
      prixProduit,
      categorieProduit,
      descriptionProduit,
      imageProduit,
      statut,
    } = await req.json();

    console.log("id vendeur est venu =", vendeur_id);

    const sauv = new Produits_Model({
      vendeur_id,
      nomProduit,
      stockProduit,
      prixProduit,
      categorieProduit,
      descriptionProduit,
      imageProduit,
      statut,
    });

    await sauv.save();

    return NextResponse.json({ mess: "ok", produit: sauv });
  } catch (error) {
    console.log("erreur d'ajout de produit =", error);
    return NextResponse.json({
      mess: "Une erreur c'est produite pendant l'ajout de produit",
    });
  }
}

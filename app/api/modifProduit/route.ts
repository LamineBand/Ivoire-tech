import Produits_Model from "@/app/model/produit_model";
import { MongoConnect } from "@/lib/mongoConnect";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    await MongoConnect();
    const {
      id,
      nouv_nomProduit,
      nouv_stockProduit,
      nouv_prixProduit,
      nouv_categorieProduit,
      nouv_descriptionProduit,
    } = await req.json();
    console.log("id du produit ========");
    console.log(id);
    console.log("nouv modif = ");
    console.log(nouv_nomProduit);
    const update = await Produits_Model.updateOne(
      { _id: id }, // Filtre : le document à mettre à jour
      {
        $set: {
          nomProduit: nouv_nomProduit,
          stockProduit: nouv_stockProduit,
          prixProduit: nouv_prixProduit,
          categorieProduit: nouv_categorieProduit,
          descriptionProduit: nouv_descriptionProduit,
        },
      }
    );
    console.log("Contenu de update ==");

    console.log(update);

    return NextResponse.json({ mess: "ok" });
  } catch (error) {
    console.log("erreur dans la modification de produit ==");
    console.log(error);
    return NextResponse.json({ mess: "erreur de modification" });
  }
}

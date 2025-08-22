import cmd_model from "@/app/model/checkout";
import { MongoConnect } from "@/lib/mongoConnect";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { id, newStatut, idvendeur } = await req.json();
    console.log("les données reçues :", id, newStatut, idvendeur);

    await MongoConnect();
    await cmd_model.updateOne(
      { ref: id }, // <-- on filtre par référence au lieu de _id
      { $set: { "produits.$[elem].statut": newStatut } },
      { arrayFilters: [{ "elem.vendeur_id": idvendeur }] }
    );

    return NextResponse.json({ mess: "ok" });
  } catch (error) {
    console.log("erreur de modification");
    console.log(error);
    return NextResponse.json({ mess: "échec de modification de statut" });
  }
}

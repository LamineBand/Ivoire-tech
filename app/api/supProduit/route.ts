import Produits_Model from "@/app/model/produit_model";
import { MongoConnect } from "@/lib/mongoConnect";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    await MongoConnect();
    const { id } = await req.json();
    console.log("reucperation de iD = " + id);
    const sup = await Produits_Model.deleteOne({ _id: id });
    console.log("contenu de sup = ");

    console.log(sup);

    return NextResponse.json({ mess: "ok" });
  } catch (error) {
    console.log("erreur de suppression");
    console.log(error);
    return NextResponse.json({ mess: "erreur de suppression" });
  }
}

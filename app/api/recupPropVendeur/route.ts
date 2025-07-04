import Produits_Model from "@/app/model/produit_model";
import { MongoConnect } from "@/lib/mongoConnect";
import { NextResponse } from "next/server";
await MongoConnect();
export async function GET() {
  try {
    const data = await Produits_Model.find();
    return NextResponse.json({ mess: "ok", data });
  } catch (error) {
    console.log("erreur de recup des produits");
    console.log(error);
    return NextResponse.json({ mess: "erreur de recuperation" });
  }
}

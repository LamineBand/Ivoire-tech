import cmd_model from "@/app/model/checkout";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const req = await cmd_model.find();
    //console.log("les commandes = ");
    //console.log(req);
    return NextResponse.json({ mess: "ok", cmd: req });
  } catch (error) {
    console.log("erreur de recupération des commandes =");
    console.log(error);
    return NextResponse.json({ mess: "erreur de chargement" });
  }
}

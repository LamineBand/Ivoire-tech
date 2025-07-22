import cmd_model from "@/app/model/checkout";
import { MongoConnect } from "@/lib/mongoConnect";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await MongoConnect(); // Si nécessaire
    const data = await req.json();
    console.log("requette reçu de commande = ");

    console.log(data);
    const add = new cmd_model(data);
    await add.save();
    return NextResponse.json({ mess: "ok" });
  } catch (error) {
    console.log("erreur de validation de commande");
    console.log(error);
    return NextResponse.json({ mess: "erreur de validation" });
  }
}

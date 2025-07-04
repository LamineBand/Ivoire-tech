import Users_Model from "@/app/model/models";
import { MongoConnect } from "@/lib/mongoConnect";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  await MongoConnect();
  try {
    const params = await context.params;
    const id = await params.id;
    const { nom, mail, mdp, tel, nomBoutique, adresse } = await req.json();
    const modif = await Users_Model.updateOne(
      { uid: id },
      { $set: { nom, mail, mdp, tel, nomBoutique, adresse } }
    );
    if (modif.modifiedCount > 0) {
      console.log("contenu de modif =");
      console.log(modif);
    } else {
      console.log("erreur de modif =");
      console.log("uid :" + id);
      return NextResponse.json({ mess: "erreur de modif" });
    }

    console.log("uid :" + id);

    return NextResponse.json({ mess: "ok" });
  } catch (error) {
    console.log("echec de modification = ");
    console.log(error);
    return NextResponse.json({ mess: "pas ok" });
  }
}

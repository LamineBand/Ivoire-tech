import Users_Model from "@/app/model/models";
import { auth } from "@/lib/fireconfig";
import { MongoConnect } from "@/lib/mongoConnect";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await MongoConnect();
    const { nom, mail, mdp, adresse, ville, tel } = await req.json();
    const user = await createUserWithEmailAndPassword(auth, mail, mdp);
    await sendEmailVerification(user.user);
    /* const client = {
      uid: user.user.uid,
      nom: nom,
      type: "Client",
    };*/
    const ClientSave = new Users_Model({
      uid: user.user.uid,
      mail,
      nom: nom,
      tel,
      adresse,
      ville,

      type: "Client",
    });
    console.log("dans client save ===");

    console.log(ClientSave);

    await ClientSave.save();
    console.log("user créer avec succès");
    return NextResponse.json({ mess: "ok" });
  } catch (error: any) {
    //gestion des erreurs
    console.log("erreur inscription client =");
    console.log(error);
    if (error.code === "auth/email-already-in-use") {
      return NextResponse.json({ mess: "Cet e-mail a déjà été utiliser" });
    } else if (error.code === "auth/weak-password") {
      return NextResponse.json({ mess: "Mot de passe trop court ou invalide" });
    }
    if (error.code === 11000) {
      const keyValue = error.keyValue || error.errorResponse?.keyValue || {};

      const duplicatedField = Object.keys(keyValue)[0] || "champ inconnu";

      return NextResponse.json(
        {
          mess: `Le champ '${duplicatedField}' est déjà utilisé.`,
          error: "mongo-duplicate",
          field: duplicatedField,
        },
        { status: 409 }
      );
    }
    return NextResponse.json({ mess: "Inscription client à echouer" });
  }
}

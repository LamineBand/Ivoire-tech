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
    const connexion = await MongoConnect();
    if (connexion!) {
      return console.log("connexion mongo a echouer");
    } else {
      console.log("connexion a mongo ok");
    }
    const { nom, mail, mdp, tel, nomBoutique, adresse } = await req.json();
    const user = await createUserWithEmailAndPassword(auth, mail, mdp);
    await sendEmailVerification(user.user);

    const vendeur = {
      uid: user.user.uid,
      mail,
      nom,
      tel,
      nomBoutique,
      adresse,
      type: "Vendeur",
    };
    //return console.log(vendeur);

    console.log("infos vendeur = ");
    console.log(vendeur);
    const saveMongoose = new Users_Model({
      uid: vendeur.uid,
      mail: vendeur.mail,
      nom: vendeur.nom,
      tel: vendeur.tel,
      nomBoutique: vendeur.nomBoutique,
      adresse: vendeur.adresse,
      type: vendeur.type,
    });
    const sav = await saveMongoose.save();
    if (sav) {
      console.log("sauvegarde mongo ok");
    }
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
    /**
    *  if (error.code === 11000) {
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
    */
    console.log("erreur serveur = ");
    console.log(error);
    return NextResponse.json({ mess: "Echec d'incription" });
  }
}

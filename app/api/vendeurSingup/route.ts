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
  } catch (error) {
    console.log("erreur serveur = ");
    console.log(error);
    return NextResponse.json({ mess: "Echec d'incription" });
  }
}

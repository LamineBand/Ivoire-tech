import Users_Model from "@/app/model/models";
import { auth } from "@/lib/fireconfig";
import { GenerateToken } from "@/lib/JWT";
import { MongoConnect } from "@/lib/mongoConnect";
import {
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await MongoConnect();
    const { mail, mdp } = await req.json();
    const user = await signInWithEmailAndPassword(auth, mail, mdp);
    if (!user.user.emailVerified) {
      await sendEmailVerification(user.user);

      return NextResponse.json({ mess: "mail pas verifieer" });
    }
    const id = user.user.uid;
    const data_user = await Users_Model.findOne({ uid: id });
    console.log("data_user = ");
    console.log(data_user);
    /*if (user_Recup.type === "Client") {
      console.log("c'est un Client");
    } else {
      console.log(" C'est un Vendeur");
    }*/
    await GenerateToken(data_user);
    return NextResponse.json({ mess: "ok", data_user });
  } catch (error) {
    console.log("erreur de connexion serveur = ");
    console.log(error);
    return NextResponse.json({ mess: "erreur de connexion" });
  }
}

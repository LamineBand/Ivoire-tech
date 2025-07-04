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
    const { nom, mail, mdp } = await req.json();
    const user = await createUserWithEmailAndPassword(auth, mail, mdp);
    await sendEmailVerification(user.user);
    /* const client = {
      uid: user.user.uid,
      nom: nom,
      type: "Client",
    };*/
    const ClientSave = new Users_Model({
      uid: user.user.uid,
      nom: nom,
      type: "Client",
    });

    await ClientSave.save();
    console.log("user créer avec succès");

    return NextResponse.json({ mess: "ok" });
  } catch (error) {
    console.log("erreur inscription client ");
    console.log(error);
    return NextResponse.json({ mess: "inscription client à echouer" });
  }
}

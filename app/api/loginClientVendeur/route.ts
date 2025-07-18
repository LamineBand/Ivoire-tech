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

    const userCredential = await signInWithEmailAndPassword(auth, mail, mdp);

    const user = userCredential.user;

    if (!user.emailVerified) {
      await sendEmailVerification(user);
      return NextResponse.json(
        { mess: "Email non vérifié. Un lien de vérification a été envoyé." },
        { status: 403 }
      );
    }

    const data_user = await Users_Model.findOne({ uid: user.uid });

    if (!data_user) {
      return NextResponse.json(
        { mess: "Utilisateur non trouvé dans la base de données." },
        { status: 404 }
      );
    }

    await GenerateToken(data_user);

    return NextResponse.json({ mess: "Connexion réussie", data_user });
  } catch (error: any) {
    console.error("Erreur de connexion serveur :", error);

    if (error.code === "auth/invalid-credential") {
      return NextResponse.json(
        {
          error: "invalid-credential",
          mess: "Email ou mot de passe incorrect.",
        },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: "server-error", mess: "Erreur serveur. Veuillez réessayer." },
      { status: 500 }
    );
  }
}

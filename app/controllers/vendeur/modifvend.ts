import axios from "axios";
import { NextResponse } from "next/server";

export async function SendProfil(
  uid: string,
  nom: string,
  mail: string,
  mdp: string,
  tel: string,
  nomBoutique: string,
  adresse: string,
  setload: React.Dispatch<React.SetStateAction<boolean>>,
  settest: React.Dispatch<React.SetStateAction<number>>,
  setmess: React.Dispatch<React.SetStateAction<string>>
) {
  try {
    setload(true);
    setmess("");
    const id = uid;
    console.log("uid =" + id);
    const req = await axios.patch(`/api/modifVendeur/${id}`, {
      nom,
      mail,
      mdp,
      tel,
      nomBoutique,
      adresse,
    });
    // voir si je peux modifier dans localstorage

    const data = {
      uid,
      nom,
      mail,
      mdp,
      tel,
      nomBoutique,
      adresse,
    };

    if (req && req.data && req.data.mess === "ok") {
      setload(false);
      setmess("");
      localStorage.setItem("user", JSON.stringify(data));

      console.log("données envoyer back");
      settest((prev) => prev + 1);
    } else {
      setload(false);
      setmess("Une erreur est survenu pendant la mise à jour");
      console.log("Une erreur est survenu pendant la mise à jour");
    }
  } catch (error) {
    setload(false);
    console.log("erreur de modification =");
    console.log(error);
    setmess("La mise à jour a echouer");
    return NextResponse.json({ mess: "La modification à échouer" });
  }
}

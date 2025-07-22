"use client";
import axios from "axios";

export async function SaveVendeur(
  e: React.FormEvent<Element>,
  nom: string,
  mail: string,
  mdp: string,
  tel: string,
  nomBoutique: string,
  adresse: string,
  setmess: React.Dispatch<React.SetStateAction<string>>,
  setload: React.Dispatch<React.SetStateAction<boolean>>,
  resetForm: () => void
) {
  e.preventDefault();
  try {
    setmess("");
    setload(true);
    const data = {
      nom,
      mail,
      mdp,
      tel,
      nomBoutique,
      adresse,
    };

    // console.log(data);

    const req = await axios.post("/api/vendeurSingup", data);
    if (req) {
      setload(false);
      if (req.data.mess !== "ok") {
        setmess(req.data.mess);
      } else {
        setmess("");
        alert(
          "Votre compte a bien été créer veuillez consulter votre boite mail pour confimer votre compte"
        );
        resetForm();
        setmess("");
      }
    }
  } catch (error) {
    setload(false);
    console.log("erreur front = ");
    console.log(error);
    setmess("Une erreur est survenue lors de l'inscription");
  }
}

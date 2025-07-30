"use client";
import axios from "axios";
import { toast } from "react-toastify";

export async function Sendmess(
  e: React.FormEvent<HTMLFormElement>,
  nom: string,
  mail: string,
  message: string,
  setload: React.Dispatch<React.SetStateAction<boolean>>,
  setnom: React.Dispatch<React.SetStateAction<string>>,
  setmail: React.Dispatch<React.SetStateAction<string>>,
  setmessage: React.Dispatch<React.SetStateAction<string>>
) {
  e.preventDefault();
  try {
    setload(false);
    console.log("reception de données =");
    console.log(nom + mail + message);
    const data = {
      nom,
      mail,
      message,
    };
    const req = await axios.post("/api/contact/", data);
    if (req && req.data.mess === "ok") {
      toast.success("Message envoyé avec succès !");
      setload(true);
      setmail("");
      setmessage("");
      setnom("");
    } else {
      toast.error(req.data.mess);
      setload(true);
    }
  } catch (error) {
    setload(true);
    console.log("erreur d'envoie de message");
    console.log(error);
    toast.error("Une erreur s'est produite !");
  }
}

import axios from "axios";

export async function InsClient(
  e: React.FormEvent<HTMLFormElement>,
  nom: string,
  mail: string,
  mdp: string,
  adresse: string,
  ville: string,
  tel: string,
  setload: React.Dispatch<React.SetStateAction<boolean>>,
  setmess: React.Dispatch<React.SetStateAction<string>>,
  setnom: React.Dispatch<React.SetStateAction<string>>,
  setmdp: React.Dispatch<React.SetStateAction<string>>,
  setmail: React.Dispatch<React.SetStateAction<string>>,
  setVille: React.Dispatch<React.SetStateAction<string>>,
  setAdresse: React.Dispatch<React.SetStateAction<string>>,
  setTelephone: React.Dispatch<React.SetStateAction<string>>
) {
  e.preventDefault();
  try {
    setload(true);
    setmess("");
    const data = {
      nom,
      mail,
      mdp,
      adresse,
      ville,
      tel,
    };
    console.log("info dans data ==== ");
    console.log(data);

    const req = await axios.post("/api/clientSingup", data);
    if (req.data && req.data.mess === "ok") {
      setmess("");
      setload(false);
      setnom("");
      setmdp("");
      setmail("");
      setVille("");
      setTelephone("");
      setAdresse("");
      //  console.log("ok reception de back");
      alert(
        "Votre compte a été créer avec succès Veuillez verifier votre e-mail pour confirmer votre compte "
      );
    } else {
      setmess(req.data.mess);
      setload(false);
      console.log("back n'a pas reçu");
    }
  } catch (error) {
    setload(false);
    console.log("erreur d'inscription = ");
    console.log(error);
  }
}

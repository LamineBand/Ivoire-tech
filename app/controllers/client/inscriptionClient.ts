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
  setmess: React.Dispatch<React.SetStateAction<string>>
) {
  e.preventDefault();
  try {
    setload(true);
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
      setload(false);
      console.log("ok reception de back");
      alert(
        "Votre compte a été créer avec succès Veuillez verifier votre e-mail pour confirmer votre compte "
      );
    } else {
      setload(false);
      console.log("back n'a pas reçu");
    }
  } catch (error) {
    setload(false);
    console.log("erreur d'inscription = ");
    console.log(error);
  }
}

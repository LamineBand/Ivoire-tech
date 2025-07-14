import axios from "axios";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export async function LoginAll(
  e: React.FormEvent<HTMLFormElement>,
  mail: string,
  mdp: string,
  setload: React.Dispatch<React.SetStateAction<boolean>>,
  route: AppRouterInstance
) {
  e.preventDefault();

  try {
    setload(true);
    const data = {
      mail,
      mdp,
    };
    const req = await axios.post("/api/loginClientVendeur", data);
    if (req.data && req.data.mess === "ok") {
      setload(false);

      const user = req.data.data_user;
      console.log("info de user = ");
      localStorage.setItem("user", JSON.stringify(user));
      console.log(user);
      if (user.type === "Client") {
        //console.log("/pages/dash/client");
        route.push("/pages/dash/client");
      } else {
        route.push("/pages/dashVendeur");
        console.log("Dashboard Vendeur");
      }
      console.log("reçu au back");
    } else if (req.data && req.data.mess === "mail pas verifieer") {
      setload(false);
      alert(
        "Votre adresse e-mail n’est pas encore vérifiée. Veuillez vérifier votre boîte mail un e-mail vous été renvoyer."
      );
    } else {
      setload(false);
      console.log("pas reçu au back");
    }
  } catch (error) {
    setload(false);
    console.log("erreur connexion =");
    console.log(error);
  }
}

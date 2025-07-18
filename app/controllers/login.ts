import axios from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export async function LoginAll(
  e: React.FormEvent<HTMLFormElement>,
  mail: string,
  mdp: string,
  setload: React.Dispatch<React.SetStateAction<boolean>>,
  route: AppRouterInstance,
  setmess: React.Dispatch<React.SetStateAction<string>>
) {
  e.preventDefault();

  try {
    setload(true);
    setmess(""); // Reset message

    const data = { mail, mdp };

    const res = await axios.post("/api/loginClientVendeur", data);

    // Cas succès (200 OK)
    const { mess, data_user } = res.data;

    if (mess === "Connexion réussie") {
      localStorage.setItem("user", JSON.stringify(data_user));

      if (data_user.type === "Client") {
        route.push("/pages/dash/client");
      } else {
        route.push("/pages/dashVendeur");
      }

      console.log("Connexion réussie :", data_user);
    } else {
      // Cas peu probable mais juste au cas où
      setmess(mess || "Réponse inattendue");
    }

    setload(false);
  } catch (error: any) {
    setload(false);

    // Axios attrape les erreurs HTTP dans `error.response`
    if (error.response) {
      const { mess, error: code } = error.response.data;

      // Gestion personnalisée des cas backend
      if (code === "invalid-credential") {
        setmess("Email ou mot de passe incorrect.");
      } else if (error.response.status === 403) {
        setmess("Votre adresse e-mail n’est pas vérifiée.");
        alert(
          "Un lien de vérification vous a été renvoyé. Vérifiez votre boîte mail."
        );
      } else {
        setmess(mess || "Erreur serveur");
      }

      console.warn("Erreur backend :", error.response.data);
    } else {
      // Erreur réseau ou autre
      setmess("Erreur réseau ou serveur. Vérifiez votre connexion.");
      console.error("Erreur inconnue :", error);
    }
  }
}

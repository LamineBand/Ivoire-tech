import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIRE_KEY, // Utilise NEXT_PUBLIC_ pour exposer la variable côté client
  authDomain: "projetfingmc.firebaseapp.com",
  projectId: "projetfingmc",
  storageBucket: "projetfingmc.appspot.com",
  messagingSenderId: "763120952047",
  appId: "1:763120952047:web:067cc1dc652471b741711a",
};

if (!firebaseConfig.apiKey) {
  throw new Error(
    "La clé API Firebase n'est pas définie. Vérifiez NEXT_PUBLIC_FIRE_KEY dans votre .env.local"
  );
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };

import { NextRequest, NextResponse } from "next/server";
import { GetAuthToken } from "./lib/JWT";

// Exemple de middleware pour le panier
async function controlPanier(req: NextRequest) {
  const data = await GetAuthToken(req);
  if (data) {
    console.log("Middleware => Vérification panier == ");
    console.log(data?.data);
    return NextResponse.redirect(new URL("/pages/checkout", req.url));
  } else {
    console.log(
      "il est pas connecter donc trouve une solution pour se connecter"
    );
    return NextResponse.redirect(new URL("/composants/login", req.url));
  }

  // Ici tu peux ajouter la logique spécifique pour contrôler le panier
  return NextResponse.next();
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Cas 1 : Si tu veux contrôler le panier uniquement pour une route spécifique
  if (pathname.startsWith("/pages/testpanier")) {
    return controlPanier(req);
  }

  // Cas 2 : Vérifier login pour une autre route
  if (pathname.startsWith("/pages/testlog")) {
    const data = await GetAuthToken(req);

    if (data && data.message === "ok") {
      console.log("Middleware => OK, accès autorisé");
      if (data.data.type === "Vendeur") {
        return NextResponse.redirect(new URL("/pages/dashVendeur", req.url));
      } else {
        return NextResponse.redirect(new URL("/pages/dash/client", req.url));
      }
    } else {
      console.log("Middleware => PAS OK, redirection vers page login");
      return NextResponse.redirect(new URL("/composants/login", req.url));
    }
  }

  return NextResponse.next(); // Ne bloque rien pour les autres routes
}

export const config = {
  matcher: [
    "/pages/testpanier", // matcher pour le panier
    "/pages/testlog", // matcher pour testlogin
  ],
};

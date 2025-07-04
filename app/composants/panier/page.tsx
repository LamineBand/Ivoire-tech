"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
//import Navbar from "../navbar/page";
import { IoMdClose } from "react-icons/io";
import { Store_Panier } from "@/app/store/panier";
import Navbar from "../navbar/navbar";

interface Produit {
  _id?: string;
  nomProduit: string;
  prixProduit: number;
  categorieProduit: string;
  stockProduit: number;
  descriptionProduit: string;
  imageProduit?: string;
  vendeur_id: string;
  qte: number;
}

export default function Panier() {
  // const [copie, setcopie] = useState<ProduitType1[]>([]);
  // gestion des du panier avec mes elements du store
  const [Produits, setProduits] = useState<ProduitType1[]>([]);
  const StorePanier = Store_Panier((state) => state.Store_P);
  const viderPanier = Store_Panier((state) => state.vider);
  const plus = Store_Panier((state) => state.addQte);
  const moins = Store_Panier((state) => state.retQte);
  const supp = Store_Panier((state) => state.supp);
  // je recupère les infos du panier dans localsotorage au chargement de la page pour mettre à jour mon tableau
  useEffect(() => {
    const recup = JSON.parse(localStorage.getItem("panier") || "[]");
    // setProduits(recup);
    setProduits(recup);
  }, []);
  /*
  useEffect(() => {
    setProduits(copie);
  }, [copie]);
*/
  console.log("dat panier = ");
  console.log(StorePanier);
  // mise à jour du store avec les qte etc...
  /* useEffect(() => {
    setDAtaPAnier(Produits);
  }, [Produits]);
*/
  // calcule la somme totale
  const total = StorePanier.reduce(
    (acc, prod) => acc + prod.prixProduit * prod.qte,
    0
  );
  // augmenter la quantité
  function ajouterQTE(id: string) {
    /* *
    setProduits((prev) => {
      return prev.map((item) =>
        item._id === id ? { ...item, qte: item.qte + 1 } : item
      );
    });
 */
  }
  // reduire la quantite
  function moinsQTE(id: string) {
    /*
    setProduits((prev) => {
      return prev.map((item) =>
        item._id === id ? { ...item, qte: item.qte - 1 } : item
      );
    });
   */
  }
  //supprimer un produit du panier
  function supprimer(id: string) {
    const confirmation = window.confirm(
      "Êtes-vous sûr de vouloir supprimer ce produit du panier ?"
    );
    if (confirmation) {
      supp(id);
      /* const nouv = Produits.filter((item) => item._id !== id);
      setProduits(nouv);
      console.log("nouveau panier ====");
      console.log(Produits);
      //setDAtaPAnier(nouv);
      localStorage.setItem("panier", JSON.stringify(nouv));*/
    }
  }

  // vider le panier
  function Vider() {
    const confirmation = window.confirm(
      "Êtes-vous sûr de vouloir vider tout le panier ?"
    );
    if (confirmation) {
      // setProduits([]);
      //localStorage.removeItem("panier"); //
      viderPanier();
    }
  }
  // mise à jour du local storage a chaque changement du tableau Produit //// zone a problemeeeeeeeeeeeee
  useEffect(() => {
    //localStorage.setItem("panier", JSON.stringify(Produits));
  }, [Produits]);

  return (
    <>
      <nav
        className="navbar "
        style={{
          backgroundColor: "#0a4580",
          position: "fixed",
          width: "100%",
          top: "-0.5rem",
        }}
      >
        <div className="container">
          <a
            className="navbar-brand"
            href="#"
            style={{ color: "white", fontWeight: "bold" }}
          >
            Ivoire-Tech
          </a>
          <Link href={"/"} className=" text-white fs-3 fw-bold">
            <IoMdClose />
          </Link>
        </div>
      </nav>
      {/* 
<Navbar nombre={nbr} onOpenModal={() => setShowModal(true)} />
      */}

      <div
        style={{
          maxWidth: 900,
          margin: "40px auto",
          padding: 20,
          backgroundColor: "#fff",
          borderRadius: 8,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: 30, fontSize: 32 }}>
          Votre Panier
        </h1>

        {StorePanier.length === 0 ? (
          <div style={{ textAlign: "center" }}>
            <p style={{ color: "#555", fontSize: 18 }}>
              Votre panier est vide.
            </p>
          </div>
        ) : (
          <>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {StorePanier.map((prod) => (
                <li
                  key={prod._id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    borderBottom: "1px solid #ddd",
                    padding: "15px 0",
                  }}
                >
                  {prod.imageProduit ? (
                    <img
                      src={prod.imageProduit}
                      alt={prod.nomProduit}
                      style={{
                        width: 80,
                        height: 80,
                        objectFit: "cover",
                        borderRadius: 6,
                        marginRight: 20,
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: 80,
                        height: 80,
                        backgroundColor: "#eee",
                        borderRadius: 6,
                        marginRight: 20,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#999",
                        fontSize: 14,
                      }}
                    >
                      Pas d’image
                    </div>
                  )}

                  <div style={{ flexGrow: 1 }}>
                    <h2 style={{ margin: "0 0 8px", fontSize: 20 }}>
                      {prod.nomProduit}
                    </h2>
                    <p style={{ margin: 0, color: "#666" }}>
                      {prod.categorieProduit} — {prod.descriptionProduit}
                    </p>
                    <p
                      style={{
                        marginTop: 8,
                        fontWeight: "bold",
                        fontSize: 16,
                      }}
                    >
                      {prod.prixProduit} FCFA x {prod.qte} ={" "}
                      {prod.prixProduit * prod.qte} FCFA
                    </p>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                      marginLeft: 20,
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => plus(prod._id!)}
                      style={{
                        padding: "6px 14px",
                        fontSize: 16,
                        borderRadius: 4,
                        border: "1px solid #888",
                        backgroundColor: "#fff",
                        cursor: "pointer",
                      }}
                      title="Ajouter"
                    >
                      +
                    </button>
                    {prod.qte > 1 && (
                      <button
                        type="button"
                        onClick={() => moins(prod._id!)}
                        style={{
                          padding: "6px 14px",
                          fontSize: 16,
                          borderRadius: 4,
                          border: "1px solid #888",
                          backgroundColor: "#fff",
                          cursor: "pointer",
                        }}
                        title="Retirer"
                      >
                        -
                      </button>
                    )}
                    <button
                      onClick={() => supprimer(prod._id!)}
                      type="button"
                      style={{
                        padding: "6px 14px",
                        fontSize: 16,
                        borderRadius: 4,
                        border: "1px solid #b22222",
                        backgroundColor: "#fdd",
                        color: "#a00",
                        cursor: "pointer",
                      }}
                      title="Supprimer"
                    >
                      Supprimer
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div
              style={{
                marginTop: 30,
                borderTop: "1px solid #ddd",
                paddingTop: 20,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <p style={{ fontSize: 22, fontWeight: "bold" }}>
                Total : {total} FCFA
              </p>

              <div style={{ display: "flex", gap: 15 }}>
                <button
                  onClick={() => Vider()}
                  style={{
                    padding: "10px 20px",
                    fontSize: 16,
                    borderRadius: 6,
                    backgroundColor: "#b22222",
                    color: "#fff",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Vider le panier
                </button>

                <button
                  style={{
                    padding: "10px 20px",
                    fontSize: 16,
                    borderRadius: 6,
                    backgroundColor: "#228B22",
                    color: "#fff",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Valider la commande
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import { X, Plus, Minus, Trash2, ShoppingCart, Package } from "lucide-react";
//import Navbar from "../navbar/page";
import { Store_Panier } from "@/app/store/panier";
import Navbar from "../navbar/navbar";
import Link from "next/link";

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
  const [Produits, setProduits] = useState<Produit[]>([]);
  const StorePanier = Store_Panier((state) => state.Store_P);
  const viderPanier = Store_Panier((state) => state.vider);
  const plus = Store_Panier((state) => state.addQte);
  const moins = Store_Panier((state) => state.retQte);
  const supp = Store_Panier((state) => state.supp);

  useEffect(() => {
    const recup = JSON.parse(localStorage.getItem("panier") || "[]");
    setProduits(recup);
  }, []);

  const total = StorePanier.reduce(
    (acc, prod) => acc + prod.prixProduit * prod.qte,
    0
  );

  function supprimer(id: string) {
    const confirmation = window.confirm(
      "Êtes-vous sûr de vouloir supprimer ce produit du panier ?"
    );
    if (confirmation) {
      supp(id);
    }
  }

  function Vider() {
    const confirmation = window.confirm(
      "Êtes-vous sûr de vouloir vider tout le panier ?"
    );
    if (confirmation) {
      viderPanier();
    }
  }

  useEffect(() => {
    //localStorage.setItem("panier", JSON.stringify(Produits));
  }, [Produits]);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      {/* Navigation Header  borderBottom: "3px solid #ff6f00", */}
      <nav
        className="navbar navbar-expand-lg fixed-top shadow-sm"
        style={{
          backgroundColor: "#0a4580",
        }}
      >
        <div className="container">
          <div className="d-flex align-items-center">
            {/**  <Package
              size={28}
              style={{ color: "#0a4580", marginRight: "10px" }}
            /> */}
            <span
              className="navbar-brand mb-0 h1"
              style={{
                color: "white",
                fontWeight: "600",
                fontSize: "1.4rem",
              }}
            >
              Ivoire-Tech
            </span>
          </div>
          <Link
            href={"/"}
            style={{
              backgroundColor: "#ff6f00",
              border: "none",
              borderRadius: "8px",
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <X size={20} style={{ color: "white" }} />
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div
        className="container"
        style={{ paddingTop: "100px", paddingBottom: "50px" }}
      >
        {/* Header */}
        <div className="text-center mb-5">
          <div className="d-flex align-items-center justify-content-center mb-3">
            <ShoppingCart
              size={32}
              style={{ color: "#0a4580", marginRight: "10px" }}
            />
            <h1
              style={{
                color: "#0a4580",
                fontSize: "2.5rem",
                fontWeight: "600",
                margin: 0,
              }}
            >
              Votre Panier
            </h1>
          </div>
          <p style={{ color: "#6c757d", fontSize: "1.1rem" }}>
            {StorePanier.length > 0
              ? `${StorePanier.length} article${
                  StorePanier.length > 1 ? "s" : ""
                } dans votre panier`
              : "Votre panier est vide"}
          </p>
        </div>

        {StorePanier.length === 0 ? (
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div
                className="card shadow-sm"
                style={{
                  backgroundColor: "white",
                  border: "2px solid #e9ecef",
                  borderRadius: "15px",
                  padding: "40px",
                }}
              >
                <div className="text-center">
                  <div
                    style={{
                      width: "80px",
                      height: "80px",
                      backgroundColor: "#ff6f00",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 20px",
                    }}
                  >
                    <ShoppingCart size={40} style={{ color: "white" }} />
                  </div>
                  <h3
                    style={{
                      color: "#0a4580",
                      marginBottom: "15px",
                      fontWeight: "600",
                    }}
                  >
                    Votre panier est vide
                  </h3>
                  <p style={{ color: "#6c757d", marginBottom: "30px" }}>
                    Commencez vos achats dès maintenant !
                  </p>
                  <Link
                    href={"/"}
                    className="btn btn-lg"
                    style={{
                      backgroundColor: "#ff6f00",
                      border: "none",
                      color: "white",
                      padding: "12px 30px",
                      borderRadius: "10px",
                      fontWeight: "600",
                    }}
                  >
                    Continuer les achats
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="col-lg-8">
              {/* Cart Items */}
              <div
                className="card shadow-sm mb-4"
                style={{
                  backgroundColor: "white",
                  border: "1px solid #e9ecef",
                  borderRadius: "15px",
                }}
              >
                <div className="card-body p-0">
                  {StorePanier.map((prod, index) => (
                    <div
                      key={prod._id}
                      className="p-4"
                      style={{
                        borderBottom:
                          index < StorePanier.length - 1
                            ? "1px solid #f8f9fa"
                            : "none",
                      }}
                    >
                      <div className="row align-items-center">
                        {/* Product Image */}
                        <div className="col-md-3 col-sm-4 mb-3 mb-md-0">
                          {prod.imageProduit ? (
                            <img
                              src={prod.imageProduit}
                              alt={prod.nomProduit}
                              className="img-fluid"
                              style={{
                                width: "100%",
                                height: "100px",
                                objectFit: "contain",
                                borderRadius: "10px",
                              }}
                            />
                          ) : (
                            <div
                              style={{
                                width: "100%",
                                height: "100px",
                                backgroundColor: "#f8f9fa",
                                borderRadius: "10px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                border: "2px solid #e9ecef",
                              }}
                            >
                              <Package size={30} style={{ color: "#6c757d" }} />
                            </div>
                          )}
                        </div>

                        {/* Product Details */}
                        <div className="col-md-6 col-sm-8">
                          <h5
                            style={{
                              color: "#0a4580",
                              fontWeight: "600",
                              marginBottom: "8px",
                            }}
                          >
                            {prod.nomProduit}
                          </h5>
                          <span
                            className="badge mb-2"
                            style={{
                              backgroundColor: "#ff6f00",
                              color: "white",
                              padding: "4px 10px",
                              borderRadius: "20px",
                              fontSize: "0.75rem",
                            }}
                          >
                            {prod.categorieProduit}
                          </span>
                          {/**   <p
                            style={{
                              color: "#6c757d",
                              fontSize: "0.9rem",
                              marginBottom: "10px",
                            }}
                          >
                            {prod.descriptionProduit}
                          </p> */}
                          <div className="d-flex align-items-center gap-3">
                            <small style={{ color: "#6c757d" }}>
                              Prix unitaire:{" "}
                              <strong style={{ color: "#ff6f00" }}>
                                {prod.prixProduit.toLocaleString()} FCFA
                              </strong>
                            </small>
                            <small style={{ color: "#6c757d" }}>
                              Quantité:{" "}
                              <strong style={{ color: "#0a4580" }}>
                                {prod.qte}
                              </strong>
                            </small>
                          </div>
                        </div>

                        {/* Price and Actions */}
                        <div className="col-md-3 text-md-end">
                          <div style={{ marginBottom: "15px" }}>
                            <div
                              style={{
                                fontSize: "1.4rem",
                                fontWeight: "700",
                                color: "#ff6f00",
                                marginBottom: "5px",
                              }}
                            >
                              {(prod.prixProduit * prod.qte).toLocaleString()}{" "}
                              FCFA
                            </div>
                          </div>

                          {/* Quantity Controls */}
                          <div className="d-flex align-items-center justify-content-md-end mb-3">
                            <div
                              className="btn-group"
                              style={{
                                backgroundColor: "#f8f9fa",
                                borderRadius: "8px",
                                padding: "2px",
                                border: "1px solid #e9ecef",
                              }}
                            >
                              {prod.qte > 1 && (
                                <button
                                  onClick={() => moins(prod._id!)}
                                  className="btn btn-sm"
                                  style={{
                                    backgroundColor: "transparent",
                                    border: "none",
                                    color: "#ff6f00",
                                    width: "32px",
                                    height: "32px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <Minus size={14} />
                                </button>
                              )}

                              <span
                                style={{
                                  padding: "6px 12px",
                                  color: "#0a4580",
                                  fontWeight: "600",
                                  minWidth: "35px",
                                  textAlign: "center",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                {prod.qte}
                              </span>
                              <button
                                onClick={() => plus(prod._id!)}
                                className="btn btn-sm"
                                style={{
                                  backgroundColor: "transparent",
                                  border: "none",
                                  color: "#ff6f00",
                                  width: "32px",
                                  height: "32px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                          </div>

                          {/* Remove Button */}
                          <button
                            onClick={() => supprimer(prod._id!)}
                            className="btn btn-sm"
                            style={{
                              backgroundColor: "#fff5f5",
                              border: "1px solid #fecaca",
                              color: "#dc2626",
                              borderRadius: "8px",
                              padding: "6px 12px",
                              fontSize: "0.85rem",
                              fontWeight: "500",
                            }}
                          >
                            <Trash2 size={12} style={{ marginRight: "4px" }} />
                            Supprimer
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Carte de resumer */}
            <div className="col-lg-4 ">
              <div
                className="card shadow-sm sticky-top"
                style={{
                  backgroundColor: "white",
                  border: "1px solid #e9ecef",
                  borderRadius: "15px",
                  top: "120px",
                }}
              >
                <div className="card-body p-4">
                  <h4
                    style={{
                      color: "#0a4580",
                      fontWeight: "600",
                      marginBottom: "20px",
                    }}
                  >
                    Résumé de la commande
                  </h4>

                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span style={{ color: "#6c757d" }}>
                      Sous-total ({StorePanier.length} article
                      {StorePanier.length > 1 ? "s" : ""})
                    </span>
                    <span style={{ fontWeight: "600", color: "#0a4580" }}>
                      {total.toLocaleString()} FCFA
                    </span>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span style={{ color: "#6c757d" }}>Livraison</span>
                    <span style={{ color: "#28a745", fontWeight: "600" }}>
                      Gratuite
                    </span>
                  </div>

                  <hr
                    style={{ margin: "20px 0", border: "1px solid #f8f9fa" }}
                  />

                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <span
                      style={{
                        fontSize: "1.2rem",
                        fontWeight: "600",
                        color: "#0a4580",
                      }}
                    >
                      Total
                    </span>
                    <span
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: "700",
                        color: "#ff6f00",
                      }}
                    >
                      {total.toLocaleString()} FCFA
                    </span>
                  </div>

                  <div
                    className="alert"
                    style={{
                      backgroundColor: "#fff7ed",
                      border: "1px solid #fed7aa",
                      borderRadius: "8px",
                      color: "#ea580c",
                      fontSize: "0.85rem",
                      marginBottom: "20px",
                    }}
                  >
                    <strong>🚚 Livraison gratuite</strong> pour les commandes
                    supérieures à 50 000 FCFA
                  </div>

                  <div className="d-grid gap-2">
                    <button
                      className="btn btn-lg"
                      style={{
                        backgroundColor: "#ff6f00",
                        border: "none",
                        color: "white",
                        padding: "15px",
                        borderRadius: "10px",
                        fontWeight: "600",
                        fontSize: "1.1rem",
                        marginBottom: "10px",
                      }}
                    >
                      Valider la commande
                    </button>

                    <button
                      onClick={Vider}
                      className="btn"
                      style={{
                        borderRadius: "10px",
                        padding: "12px",
                        fontWeight: "500",
                        border: "2px solid #fecaca",
                        color: "#dc2626",
                        backgroundColor: "#fff5f5",
                      }}
                    >
                      Vider le panier
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

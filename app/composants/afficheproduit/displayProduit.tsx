"use client";

import React, { useEffect, useState } from "react";
import { ShoppingCart, Eye } from "lucide-react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Link from "next/link";
import styles from "./css/DisplayProduit.module.css";
import { Store_Panier } from "@/app/store/panier";
import useSeachStore from "@/app/store/affiche_Seach";
import { IoClose } from "react-icons/io5";
import { GoArrowRight } from "react-icons/go";
import { FaSearch } from "react-icons/fa";
import { MdRemoveRedEye } from "react-icons/md";
import { FiShoppingCart } from "react-icons/fi";
import { ProduitType1 } from "@/type/produit";

interface Props {
  //  modif: Dispatch<SetStateAction<number>>;
  showModal: boolean;
  onCloseModal: () => void;
}

const DisplayProduit: React.FC<Props> = ({
  // modif,
  showModal,
  onCloseModal,
}) => {
  ///les store Panier
  const StorePanier = Store_Panier((state) => state.Store_P);
  const AddStore_P = Store_Panier((state) => state.AddStore_P);
  const compteurPanier = Store_Panier((state) => state.increment);
  // store seach
  const StoreSeach = useSeachStore((state) => state.seach);
  const fermerture = useSeachStore((state) => state.ferme);
  // les variables d'états
  const [produits, setProduits] = useState<ProduitType1[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [DetailProd, setDetailProd] = useState<ProduitType1 | null>(null);
  const [mess_seach, setmess_seach] = useState("");
  const [tabPanier, settabPanier] = useState<ProduitType1[]>([]);
  const [search, setSearch] = useState("");
  const [produitsFiltres, setproduitsFiltres] = useState<ProduitType1[]>([]);

  // fonctionnalité de barre de rereche
  console.log("les lettre de seach == ");
  console.log(search);
  useEffect(() => {
    setproduitsFiltres([]);
    setmess_seach("");
    if (search !== "") {
      const produitsFiltres = produits.filter((p) =>
        p.nomProduit.toLowerCase().includes(search.toLowerCase())
      );
      if (produitsFiltres.length === 0) {
        setmess_seach("Produits introuvables");
      }
      setproduitsFiltres(produitsFiltres);
    } else {
      setmess_seach("");
      setproduitsFiltres([]);
    }
  }, [search]);
  /////// fermerture de recherche et ouverture de detail
  console.log("contenu de tableau filtré ===");
  console.log(produitsFiltres);

  // recuperation des données dans la base de données au chargement de la page les 8 derniers
  useEffect(() => {
    const fetchProduits = async () => {
      try {
        const res = await axios.get("/api/recupProduits");
        console.log("Produits récupérés :", res.data.data);
        const trie = res.data.data;
        const huit = [];

        for (
          let index = trie.length - 1;
          index >= trie.length - 8 && index >= 0;
          index--
        ) {
          huit.push(trie[index]);
        }

        setProduits(huit.reverse()); // On inverse pour avoir du plus récent au plus ancien
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération :", error);
      }
    };

    fetchProduits();
  }, []);
  //recupération de la taille du tableau pour voir le nombre d'élément dans panier
  useEffect(() => {
    /*
    const p = JSON.parse(localStorage.getItem("panier") || "[]");
    const taille = p.length;
    console.log("taille du tableau ==");
    modif(taille);
   */
  }, []);

  // Ajout de produit au panier
  const handleAddToCart = (produit: ProduitType1) => {
    toast.success("Produit ajouter au panier");
    console.log("Ajout au panier :", produit);
    const {
      _id,
      nomProduit,
      prixProduit,
      categorieProduit,
      stockProduit,
      descriptionProduit,
      imageProduit,
      vendeur_id,
      statut,
    } = produit;
    const element = {
      _id,
      nomProduit,
      prixProduit,
      categorieProduit,
      stockProduit,
      descriptionProduit,
      imageProduit,
      vendeur_id,
      qte: 1,
      statut,
    };
    //modif((prev) => prev + 1);
    settabPanier((prevTab) => {
      const exist = prevTab.find((item) => item._id === element._id);
      if (exist) {
        // Si l’élément existe déjà, on peut augmenter la quantité ou ne rien faire
        return prevTab.map((item) =>
          item._id === element._id ? { ...item, qte: item.qte + 1 } : item
        );
      } else {
        // Sinon, on ajoute le nouvel élément
        return [...prevTab, element];
      }
    });
    AddStore_P(element);
    compteurPanier();
    //localStorage.setItem("panier", JSON.stringify(tabPanier));
  };
  console.log("dan storeeee==");
  console.log(StorePanier);

  //  console.log("element dans store ===");
  //console.log(DataPanier);

  //recupération des éléments du panier au chargement tabPanier
  useEffect(() => {
    const panierSauvegarde = localStorage.getItem("panier");
    if (panierSauvegarde) {
      settabPanier(JSON.parse(panierSauvegarde));
    }
  }, []);

  // ajoute dans localstorage a chaque mis a jour /////////// Zone à problèmeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
  useEffect(() => {
    // localStorage.setItem("panier", JSON.stringify(tabPanier));
    //  setDAtaPAnier(tabPanier);
  }, [tabPanier]);

  //console.log("Panier de produit tabPanier ===== ");
  //console.log(tabPanier);

  // voir detail de produits
  const handleViewDetails = (detailproduit: ProduitType1) => {
    console.log("Voir détails =========", detailproduit);
    setDetailProd(detailproduit);
    setproduitsFiltres([]);
  };
  console.log("contenu de detail DetailProd ==== ");
  console.log(DetailProd);

  function ferme_ouvre() {
    document.getElementById("ferme_rech")?.click();
    setTimeout(() => {
      // handleViewDetails(prod);
      document.getElementById("DetailG")?.click();
    }, 100);
  }
  useEffect(() => {
    console.log(" detail prod a changer ===");
    console.log(DetailProd);
  }, [DetailProd]);

  // console.log("les produits dans Home");
  // console.log(produits);

  return (
    <div className="container py-4">
      <ToastContainer />

      <div className="mb-4 d-flex align-items-center">
        <h3
          style={{
            fontFamily: "Raleway ",
            fontWeight: "500",
          }}
        >
          Produits récent{" "}
        </h3>
        <Link
          href={"/pages/tout_produit/"}
          className="ms-auto link-tous-produits"
          style={{
            textDecoration: "none",
            color: "#ff6f00",
            fontSize: "1.1rem",
            fontFamily: "Open Sans",
            fontWeight: "400",
          }}
        >
          Tous les produits <GoArrowRight />
        </Link>
      </div>
      {/** Recherche de produit depuis la base de donnée et affichage */}
      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      ) : (
        <div className="row g-4">
          {produits && produits.length === 0 ? (
            <div className="text-center">
              <p
                className="text-muted"
                style={{ fontFamily: "Open Sans", fontWeight: "400" }}
              >
                Aucun produit disponible.
              </p>
            </div>
          ) : (
            produits?.map((prod) => (
              <div key={prod._id} className="col-sm-6 col-md-4 col-lg-3">
                <div data-aos="fade-up" data-aos-duration="3000">
                  <div className="card h-100 shadow-sm border-0">
                    <img
                      src={
                        prod.imageProduit ||
                        "https://img.freepik.com/vecteurs-premium/vecteur-icone-image-par-defaut-page-image-manquante-pour-conception-site-web-application-mobile-aucune-photo-disponible_87543-11093.jpg"
                      }
                      className="card-img-top"
                      alt={prod.nomProduit}
                      style={{
                        height: "180px",
                        objectFit: "cover",
                        borderTopLeftRadius: "0.5rem",
                        borderTopRightRadius: "0.5rem",
                      }}
                    />
                    <div className="card-body d-flex flex-column">
                      <h5
                        className="card-title fw-bold"
                        style={{
                          fontFamily: "Raleway ",
                          fontWeight: "500",
                        }}
                      >
                        {prod.nomProduit}
                      </h5>

                      <p className="mb-1">
                        {prod.stockProduit === 0 ? (
                          <span
                            style={{ color: "red", fontFamily: "Open Sans" }}
                          >
                            Produit en rupture de stock
                          </span>
                        ) : prod.stockProduit > 5 ? (
                          <span
                            style={{ color: "green", fontFamily: "Open Sans" }}
                          >
                            Produit en stock
                          </span>
                        ) : (
                          <span
                            style={{ color: "red", fontFamily: "Open Sans" }}
                          >
                            {prod.stockProduit} Produits restants
                          </span>
                        )}
                      </p>

                      <p className="fw-bold mb-2 fs-5">
                        {prod.prixProduit.toLocaleString()} FCFA
                      </p>

                      <div className="d-flex justify-content-between mt-auto">
                        <button
                          className="btn btn-sm btn-primary d-flex align-items-center"
                          onClick={() => handleAddToCart(prod)}
                        >
                          <ShoppingCart size={16} className="me-1" />
                          Ajouter
                        </button>
                        <button
                          id="DetailG"
                          data-bs-toggle="modal"
                          data-bs-target="#productDetailsModal"
                          className="btn btn-sm btn-outline-secondary d-flex align-items-center"
                          onClick={() => handleViewDetails(prod)}
                        >
                          <Eye size={16} className="me-1" />
                          Détails
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
      {/** fin Recherche de produit depuis la base de donnée et affichage */}

      {/**Modal de detail */}
      <div
        className="modal fade"
        id="productDetailsModal"
        tabIndex={-1}
        aria-labelledby="productDetailsLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl modal-dialog-centered">
          <div className="modal-content">
            {/* Header */}
            <div className="modal-header border-bottom-0">
              <h5
                className="modal-title fw-bold"
                id="productDetailsLabel"
                style={{
                  fontFamily: "Montserrat",
                  fontWeight: "500",
                }}
              >
                Détails du produit
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Fermer"
              ></button>
            </div>

            {/* Body */}
            <div className="modal-body">
              <div className="row g-4">
                {/* Image */}
                <div className="col-md-6 text-center">
                  <img
                    src={DetailProd?.imageProduit}
                    alt="Nom du produit"
                    className="img-fluid rounded shadow-sm"
                    style={{ maxHeight: "400px", objectFit: "contain" }}
                  />
                </div>

                {/* Infos */}
                <div className="col-md-6">
                  <h3
                    className="fw-bold mb-3"
                    style={{
                      fontFamily: "Raleway ",
                      fontWeight: "500",
                    }}
                  >
                    {DetailProd?.nomProduit}
                  </h3>

                  <p
                    className="mb-1 text-muted"
                    style={{ fontFamily: "Open Sans", fontWeight: "400" }}
                  >
                    <strong>Catégorie :</strong> {DetailProd?.categorieProduit}
                  </p>

                  <p
                    className="mb-1 text-muted"
                    style={{ fontFamily: "Open Sans", fontWeight: "400" }}
                  >
                    <strong>Stock :</strong> {DetailProd?.stockProduit}
                  </p>

                  <p className="h4 fw-bold text-primary mb-3">
                    {DetailProd?.prixProduit} FCFA
                  </p>

                  <p
                    className="text-secondary mb-4"
                    style={{
                      lineHeight: 1.6,
                      fontFamily: "Open Sans",
                      fontWeight: "400",
                    }}
                  >
                    {DetailProd?.descriptionProduit}
                  </p>

                  <div>
                    <span className="badge bg-primary me-2">
                      #{DetailProd?.categorieProduit}
                    </span>
                    {DetailProd?.stockProduit! > 0 ? (
                      <span className="badge bg-success">En stock</span>
                    ) : (
                      <span className="badge bg-danger">Rupture de stock</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="modal-footer border-top-0">
              <button
                type="button"
                className="btn btn-primary me-auto"
                onClick={() => handleAddToCart(DetailProd!)}
              >
                Ajouter au panier
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary"
                data-bs-dismiss="modal"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      </div>
      {/**fin modal */}

      {/**Modale seach
       *
       * *showModal*
       */}

      {StoreSeach && (
        <div
          className="modal show fade"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          tabIndex={-1}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content modern-modal">
              {/* Bouton de fermeture flottant fermerture  onClick={onCloseModal}*/}
              <button
                id="ferme_rech"
                type="button"
                className="btn-close floating-close shadow-none"
                onClick={fermerture}
                style={{
                  backgroundColor: "white",
                  padding: "0.90rem",
                  borderRadius: "100%",
                }}
              >
                <span>
                  <IoClose size={30} />
                </span>
              </button>

              {/* Input dans seach */}
              <div className="modal-body d-flex justify-content-center align-items-center">
                <div className="input-group" style={{ maxWidth: "400px" }}>
                  <span className="input-group-text bg-white border-end-0">
                    <FaSearch style={{ color: "#6c757d" }} />
                  </span>
                  <input
                    onChange={(e) => setSearch(e.target.value)}
                    type="text"
                    className="form-control shadow-none border-start-0"
                    placeholder="Rechercher un produit"
                  />
                </div>
              </div>
              {/** liste des prosuits filtré selon les mots clé dans seach */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                  maxHeight: "300px",
                  overflowY: "auto",
                  padding: "0 10px",
                  scrollbarWidth: "none" /* Firefox */,
                  msOverflowStyle: "none" /* IE 10+ */,
                }}
                className="product-list"
              >
                {produitsFiltres.length === 0 ? (
                  <p
                    style={{
                      color: "#888",
                      fontStyle: "italic",
                      textAlign: "center",
                      marginTop: "1rem",
                      userSelect: "none",
                    }}
                  >
                    {mess_seach}
                  </p>
                ) : (
                  produitsFiltres.map((item) => (
                    <div
                      key={item._id}
                      style={{
                        display: "flex",
                        gap: "12px",
                        border: "1px solid #ddd",
                        borderRadius: "12px",
                        padding: "8px",
                        alignItems: "center",
                        background: "#fff",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                      }}
                    >
                      <img
                        src={item.imageProduit}
                        alt={item.nomProduit}
                        style={{
                          width: "70px",
                          height: "70px",
                          objectFit: "cover",
                          borderRadius: "8px",
                          flexShrink: 0,
                        }}
                      />
                      <div style={{ flex: 1 }}>
                        <h5
                          style={{
                            margin: 0,
                            fontSize: "1rem",
                            fontWeight: 600,
                          }}
                        >
                          {item.nomProduit}
                        </h5>
                        <p
                          style={{
                            margin: 0,
                            fontSize: "0.85rem",
                            color: "#555",
                          }}
                        >
                          {item.prixProduit.toFixed()} FCFA
                        </p>
                        <p
                          style={{
                            margin: 0,
                            fontSize: "0.85rem",
                            color: "#555",
                          }}
                        >
                          {item.stockProduit === 0 ? (
                            <span style={{ color: "red", fontWeight: "bold" }}>
                              Produit en rupture de stock
                            </span>
                          ) : item.stockProduit > 5 ? (
                            <span
                              style={{ color: "green", fontWeight: "bold" }}
                            >
                              Produit en stock
                            </span>
                          ) : (
                            <span
                              style={{ color: "orange", fontWeight: "bold" }}
                            >
                              {item.stockProduit} Produits restants
                            </span>
                          )}
                        </p>
                        <div
                          style={{
                            display: "flex",
                            gap: "8px",
                            marginTop: "4px",
                          }}
                        >
                          <button
                            type="button"
                            style={{
                              padding: "4px 12px",
                              border: "none",
                              borderRadius: "20px",
                              fontSize: "0.8rem",
                              cursor: "pointer",
                              backgroundColor: "#0d6efd",
                              color: "white",
                            }}
                            onClick={() => {
                              setDetailProd(item); // Met à jour le produit à afficher
                              fermerture(); // Ferme la modale de recherche
                              setTimeout(() => {
                                if (
                                  typeof window !== "undefined" &&
                                  window.bootstrap
                                ) {
                                  const modal = new window.bootstrap.Modal(
                                    document.getElementById(
                                      "productDetailsModal"
                                    )
                                  );
                                  modal.show();
                                }
                              }, 200);
                            }}
                          >
                            <MdRemoveRedEye size={15} />
                          </button>
                          <button
                            style={{
                              padding: "4px 12px",
                              border: "none",
                              borderRadius: "20px",
                              fontSize: "0.8rem",
                              cursor: "pointer",
                              backgroundColor: "#198754",
                              color: "white",
                            }}
                            onClick={() => handleAddToCart(item)}
                            disabled={item.stockProduit === 0}
                          >
                            <FiShoppingCart size={15} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              {/** fin liste des prosuits filtré selon les mots clé dans seach */}
            </div>
          </div>
        </div>
      )}
      {/** fin Modale seach
       *
  
       */}
    </div>
  );
};

export default DisplayProduit;

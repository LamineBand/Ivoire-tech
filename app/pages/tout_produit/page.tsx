"use client";
import Carous1 from "@/app/composants/carous1/page";
import Navbar, { NavbarProps } from "@/app/composants/navbar/navbar";
import useSeachStore from "@/app/store/affiche_Seach";
import { Store_Panier } from "@/app/store/panier";
import axios from "axios";
import { Eye, ShoppingCart } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Nos_produit() {
  const [produits, setProduits] = useState<ProduitType1[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState("");
  const [produitsFiltres, setproduitsFiltres] = useState<ProduitType1[]>([]);
  const [DetailProd, setDetailProd] = useState<ProduitType1>();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [produit_filtre, setproduit_filtre] = useState<ProduitType1[]>([]);
  // store de seach
  const StoreSeach = useSeachStore((state) => state.seach);
  const fermerture = useSeachStore((state) => state.ferme);

  ///les store Panier
  const StorePanier = Store_Panier((state) => state.Store_P);
  const AddStore_P = Store_Panier((state) => state.AddStore_P);
  const compteurPanier = Store_Panier((state) => state.increment);

  //fonctionnalité de filtrage par catégorie
  useEffect(() => {
    if (selectedCategory === "all") {
      // Si l'utilisateur choisit "Toutes", tu affiches tout
      setproduit_filtre(produits);
    } else {
      // Sinon, filtre selon la catégorie
      const cat = produits.filter(
        (item) => item.categorieProduit === selectedCategory
      );
      setproduit_filtre(cat);
    }
  }, [selectedCategory, produits]);

  // fonctionnalité de barre de rereche
  console.log("les lettre de seach == ");
  console.log(search);
  useEffect(() => {
    const produitsFiltres = produits.filter((prod) =>
      prod.nomProduit.toLowerCase().includes(search.toLowerCase())
    );
    setproduitsFiltres(produitsFiltres);
  }, [search]);

  console.log("dans page produits : ");
  console.log(produits);

  const openModal = () => true;
  //const openModal = () => setShowModal(true);
  //const closeModal = () => setShowModal(false);

  // recuperation des données dans la base de données au chargement de la page
  useEffect(() => {
    const fetchProduits = async () => {
      try {
        const res = await axios.get("/api/recupProduits");
        console.log("Produits récupérés :", res.data.data);
        setProduits(res.data.data);
        setLoading(false);
        // setProduits(res.data) ou autre selon ta logique
      } catch (error) {
        console.error("Erreur lors de la récupération :", error);
      }
    };

    fetchProduits();
  }, []);

  // fonction pour fermé seach et ouvrir detail
  function ferme_ouvre() {
    document.getElementById("ferme_rech")?.click();
    setTimeout(() => {
      // handleViewDetails(prod);
      document.getElementById("DetailG")?.click();
    }, 100);
  }

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
    };
    //modif((prev) => prev + 1);
    /**
      *  settabPanier((prevTab) => {
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
      */
    AddStore_P(element);
    compteurPanier();
    //localStorage.setItem("panier", JSON.stringify(tabPanier));
  };
  console.log("dan storeeee");
  console.log(StorePanier);

  // voir detail de produits
  const handleViewDetails = (voirProd: ProduitType1) => {
    console.log("Voir détails =========", voirProd);
    setDetailProd(voirProd);
  };
  function test() {
    alert("detail clicé");
  }

  return (
    <>
      <Carous1 />
      <Navbar {...({ onOpenModal: openModal } as NavbarProps)} />
      <center>
        <div
          style={{
            marginTop: "7rem",
            maxWidth: "600px",
            width: "90%",
            padding: "2rem",
            background: "linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%)",
            borderRadius: "16px",
            boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
            marginLeft: "auto",
            marginRight: "auto",
            border: "1px solid #eee",
          }}
        >
          <h5
            className="mb-4"
            style={{
              fontWeight: "700",
              textAlign: "center",
              color: "#222",
              fontSize: "1.5rem",
              letterSpacing: "0.5px",
            }}
          >
            Filtrer par catégorie
          </h5>

          <div className="d-flex justify-content-center flex-wrap gap-3">
            <button
              className="btn btn-primary"
              style={{
                minWidth: "120px",
                borderRadius: "50px",
                fontWeight: "500",
                transition: "all 0.3s ease",
              }}
              onClick={() => setSelectedCategory("smartwatch")}
            >
              Smartwatch
            </button>
            <button
              className="btn btn-primary"
              style={{
                minWidth: "120px",
                borderRadius: "50px",
                fontWeight: "500",
                transition: "all 0.3s ease",
              }}
              onClick={() => setSelectedCategory("smartphone")}
            >
              Smartphone
            </button>
            <button
              className="btn btn-primary"
              style={{
                minWidth: "120px",
                borderRadius: "50px",
                fontWeight: "500",
                transition: "all 0.3s ease",
              }}
              onClick={() => setSelectedCategory("ordinateurs")}
            >
              Ordinateurs
            </button>
            <button
              className="btn btn-primary"
              style={{
                minWidth: "120px",
                borderRadius: "50px",
                fontWeight: "500",
                transition: "all 0.3s ease",
              }}
              onClick={() => setSelectedCategory("accessoires")}
            >
              Accessoires
            </button>
            <button
              className="btn btn-secondary"
              style={{
                minWidth: "120px",
                borderRadius: "50px",
                fontWeight: "500",
                transition: "all 0.3s ease",
              }}
              onClick={() => setSelectedCategory("all")}
            >
              Toutes catégories
            </button>
          </div>
        </div>
      </center>

      <div className="container " style={{ marginTop: "1rem" }}>
        <h5 className="ms-4"> Explorez nos produits</h5>
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1.5rem",
            padding: "2rem",
          }}
        >
          {produit_filtre.map((item) => (
            <div
              key={item._id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                background: "#fff",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.2s",
                width: "100%", // garde la largeur 100% pour remplir la cellule grid
                maxWidth: "300px",
              }}
            >
              <img
                src={item.imageProduit}
                alt={item.nomProduit}
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                }}
              />
              <div style={{ padding: "1rem", flex: 1 }}>
                <h5 style={{ margin: "0 0 0.5rem", fontSize: "1rem" }}>
                  {item.nomProduit}
                </h5>
                <p style={{ margin: "0 0 0.5rem", color: "#555" }}>
                  {item.prixProduit.toFixed()} FCFA
                </p>
                <p
                  style={{
                    margin: "0 0 0.5rem",
                    fontSize: "0.85rem",
                    fontWeight: "bold",
                    color:
                      item.stockProduit === 0
                        ? "red"
                        : item.stockProduit > 5
                        ? "green"
                        : "orange",
                  }}
                >
                  {item.stockProduit === 0
                    ? "Rupture de stock"
                    : item.stockProduit > 5
                    ? "En stock"
                    : `${item.stockProduit} restants`}
                </p>
                <div
                  style={{ display: "flex", gap: "0.5rem", marginTop: "auto" }}
                >
                  <button
                    className="btn btn-sm btn-primary d-flex align-items-center"
                    onClick={() => handleAddToCart(item)}
                    disabled={item.stockProduit === 0}
                  >
                    <ShoppingCart size={16} className="me-1" /> Ajouter
                  </button>
                  <button
                    id="DetailG"
                    data-bs-toggle="modal"
                    data-bs-target="#productDetailsModal"
                    className="btn btn-sm btn-outline-secondary d-flex align-items-center ms-3"
                    onClick={() => handleViewDetails(item)}
                  >
                    <Eye size={16} className="me-1" />
                    Détails
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>

      {/** modal et contenu de barre de recherche   showModal*/}
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
              >
                <span>X</span>
              </button>

              {/* Input*/}
              <div className="modal-body d-flex justify-content-center align-items-center">
                <input
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  className="modern-input shadow-none"
                  placeholder=" Rechercher un produit"
                />
              </div>
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
                    Produits introuvables
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
                              ferme_ouvre();
                              handleViewDetails(item);
                              //test;
                            }}
                          >
                            Voir détail
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
                            Ajouter au panier
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {/**fin modal recherche*/}

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
              <h5 className="modal-title fw-bold" id="productDetailsLabel">
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
                  <h3 className="fw-bold mb-3">{DetailProd?.nomProduit}</h3>

                  <p className="mb-1 text-muted">
                    <strong>Catégorie :</strong> {DetailProd?.categorieProduit}
                  </p>

                  <p className="mb-1 text-muted">
                    <strong>Stock :</strong> {DetailProd?.stockProduit}
                  </p>

                  <p className="h4 fw-bold text-primary mb-3">
                    {DetailProd?.prixProduit} FCFA
                  </p>

                  <p
                    className="text-secondary mb-4"
                    style={{ lineHeight: 1.6 }}
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
      {/**fin modal detail*/}
    </>
  );
}

export default Nos_produit;

"use client";

import React, { useEffect, useState } from "react";
//import Carous1 from "../components/Carous1";
//import Navbar, { NavbarProps } from "../components/Navbar";
import { Users, Target, Award, Heart, Zap, Shield } from "lucide-react";
import Carous1 from "@/app/composants/carous1/page";
import Navbar, { NavbarProps } from "@/app/composants/navbar/navbar";
import "./css/app.css";
import Link from "next/link";
import axios from "axios";
import useSeachStore from "@/app/store/affiche_Seach";
import { toast, ToastContainer } from "react-toastify";
import { Store_Panier } from "@/app/store/panier";
import { IoClose } from "react-icons/io5";
import Footer from "@/app/composants/footer/footer";
function Apropos() {
  const [produits, setProduits] = useState<ProduitType1[]>([]);
  const [search, setSearch] = useState("");
  const [produitsFiltres, setproduitsFiltres] = useState<ProduitType1[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [DetailProd, setDetailProd] = useState<ProduitType1>();
  const openModal = () => true;
  // store de seach
  const StoreSeach = useSeachStore((state) => state.seach);
  const fermerture = useSeachStore((state) => state.ferme);

  ///les store Panier
  const StorePanier = Store_Panier((state) => state.Store_P);
  const AddStore_P = Store_Panier((state) => state.AddStore_P);
  const compteurPanier = Store_Panier((state) => state.increment);
  // fonctionnalité de barre de rereche
  console.log("les lettre de seach == ");
  console.log(search);
  useEffect(() => {
    const produitsFiltres = produits.filter((prod) =>
      prod.nomProduit.toLowerCase().includes(search.toLowerCase())
    );
    setproduitsFiltres(produitsFiltres);
  }, [search]);

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
  console.log("produit au chargement");
  console.log(produits);

  // fonction pour fermé seach et ouvrir detail
  function ferme_ouvre() {
    document.getElementById("ferme_rech")?.click();
    setTimeout(() => {
      // handleViewDetails(prod);
      document.getElementById("DetailG")?.click();
      console.log();
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

  return (
    <>
      <ToastContainer />
      <Carous1 />
      <Navbar {...({ onOpenModal: openModal } as NavbarProps)} />

      <div
        style={{
          marginTop: "5rem",
          minHeight: "100vh",
          backgroundColor: "#f8fafc",
        }}
      >
        {/* section Heros */}
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "4rem 2rem",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontWeight: "800",
              color: "#1a202c",
              marginBottom: "1.5rem",
              letterSpacing: "-0.025em",
            }}
          >
            À propos de nous
          </h1>

          <div
            style={{
              width: "100px",
              height: "4px",
              backgroundColor: "#4f46e5",
              margin: "0 auto 2rem auto",
              borderRadius: "2px",
            }}
          ></div>

          <p
            style={{
              fontSize: "1.25rem",
              color: "#64748b",
              maxWidth: "800px",
              margin: "0 auto",
              lineHeight: "1.8",
            }}
          >
            Ivoire-Tech, on vit et respire la tech ! PC dernier cri, smartphones
            tendance, accessoires high-tech… On sélectionne pour vous le
            meilleur du numérique à prix juste. Notre équipe est là pour vous
            conseiller et vous accompagner à chaque étape. Ivoire-Tech, c’est
            bien plus qu’un e-commerce : c’est votre univers digital !
          </p>
        </div>

        {/* debuts des sections  */}
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "4rem 2rem",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "3rem",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  backgroundColor: "#eff6ff",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.5rem auto",
                }}
              >
                <Users size={40} color="#4f46e5" />
              </div>
              <h3
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "700",
                  color: "#1a202c",
                  margin: "0 0 0.5rem 0",
                }}
              >
                10,000+
              </h3>
              <p
                style={{
                  color: "#64748b",
                  fontSize: "1.1rem",
                  margin: 0,
                }}
              >
                Clients satisfaits
              </p>
            </div>

            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  backgroundColor: "#f0fdf4",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.5rem auto",
                }}
              >
                <Award size={40} color="#22c55e" />
              </div>
              <h3
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "700",
                  color: "#1a202c",
                  margin: "0 0 0.5rem 0",
                }}
              >
                5+
              </h3>
              <p
                style={{
                  color: "#64748b",
                  fontSize: "1.1rem",
                  margin: 0,
                }}
              >
                Années d'expérience
              </p>
            </div>

            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  backgroundColor: "#fef3c7",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.5rem auto",
                }}
              >
                <Target size={40} color="#f59e0b" />
              </div>
              <h3
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "700",
                  color: "#1a202c",
                  margin: "0 0 0.5rem 0",
                }}
              >
                1,000+
              </h3>
              <p
                style={{
                  color: "#64748b",
                  fontSize: "1.1rem",
                  margin: 0,
                }}
              >
                Produits disponibles
              </p>
            </div>

            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  backgroundColor: "#fce7f3",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.5rem auto",
                }}
              >
                <Heart size={40} color="#ec4899" />
              </div>
              <h3
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "700",
                  color: "#1a202c",
                  margin: "0 0 0.5rem 0",
                }}
              >
                99%
              </h3>
              <p
                style={{
                  color: "#64748b",
                  fontSize: "1.1rem",
                  margin: 0,
                }}
              >
                Taux de satisfaction
              </p>
            </div>
          </div>
        </div>

        {/* Mission & Vision Section */}
        <div
          className=" container-fluid p-4"
          style={{
            maxWidth: "1200px",
          }}
        >
          <div className="row  justify-content-center">
            <div
              className="col-lg-4 col-md-5 mt-5 me-lg-5"
              style={{
                backgroundColor: "#ffffff",
                padding: "3rem",
                borderRadius: "20px",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                border: "1px solid #e2e8f0",
              }}
            >
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  backgroundColor: "#eff6ff",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "2rem",
                }}
              >
                <Target size={30} color="#4f46e5" />
              </div>
              <h3
                style={{
                  fontSize: "1.75rem",
                  fontWeight: "700",
                  color: "#1a202c",
                  marginBottom: "1.5rem",
                }}
              >
                Notre Mission
              </h3>
              <p
                style={{
                  color: "#64748b",
                  lineHeight: "1.7",
                  fontSize: "1.1rem",
                  margin: 0,
                }}
              >
                Démocratiser l'accès à la technologie en proposant des produits
                de qualité à des prix compétitifs, tout en offrant un service
                client exceptionnel et des conseils personnalisés pour chaque
                client.
              </p>
            </div>

            <div
              className="col-lg-4 col-md-5  mt-5 ms-lg-5"
              style={{
                backgroundColor: "#ffffff",
                padding: "3rem",
                borderRadius: "20px",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                border: "1px solid #e2e8f0",
              }}
            >
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  backgroundColor: "#f0fdf4",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "2rem",
                }}
              >
                <Zap size={30} color="#22c55e" />
              </div>
              <h3
                style={{
                  fontSize: "1.75rem",
                  fontWeight: "700",
                  color: "#1a202c",
                  marginBottom: "1.5rem",
                }}
              >
                Notre Vision
              </h3>
              <p
                style={{
                  color: "#64748b",
                  lineHeight: "1.7",
                  fontSize: "1.1rem",
                  margin: 0,
                }}
              >
                Devenir la référence en matière de vente de produits
                technologiques, en créant une communauté de passionnés et en
                contribuant à l'innovation technologique accessible à tous.
              </p>
            </div>
          </div>
        </div>

        {/* Nos valeurs */}
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "4rem 2rem",
            marginTop: "2rem",
          }}
        >
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              textAlign: "center",
              marginBottom: "3rem",
            }}
          >
            <h2
              style={{
                fontSize: "2.5rem",
                fontWeight: "700",
                color: "#1a202c",
                marginBottom: "1rem",
              }}
            >
              Nos Valeurs
            </h2>
            <div
              style={{
                width: "80px",
                height: "4px",
                backgroundColor: "#4f46e5",
                margin: "0 auto",
                borderRadius: "2px",
              }}
            ></div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "2rem",
              maxWidth: "1200px",
              margin: "0 auto",
            }}
          >
            <div
              style={{
                textAlign: "center",
                padding: "2rem",
                borderRadius: "16px",
                backgroundColor: "#f8fafc",
                border: "1px solid #e2e8f0",
              }}
            >
              <div
                style={{
                  width: "70px",
                  height: "70px",
                  backgroundColor: "#eff6ff",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.5rem auto",
                }}
              >
                <Shield size={35} color="#4f46e5" />
              </div>
              <h4
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  color: "#1a202c",
                  marginBottom: "1rem",
                }}
              >
                Confiance
              </h4>
              <p
                style={{
                  color: "#64748b",
                  lineHeight: "1.6",
                  margin: 0,
                }}
              >
                Nous construisons des relations durables basées sur la
                transparence et l'honnêteté.
              </p>
            </div>

            <div
              style={{
                textAlign: "center",
                padding: "2rem",
                borderRadius: "16px",
                backgroundColor: "#f8fafc",
                border: "1px solid #e2e8f0",
              }}
            >
              <div
                style={{
                  width: "70px",
                  height: "70px",
                  backgroundColor: "#f0fdf4",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.5rem auto",
                }}
              >
                <Award size={35} color="#22c55e" />
              </div>
              <h4
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  color: "#1a202c",
                  marginBottom: "1rem",
                }}
              >
                Excellence
              </h4>
              <p
                style={{
                  color: "#64748b",
                  lineHeight: "1.6",
                  margin: 0,
                }}
              >
                Nous nous efforçons d'offrir la meilleure qualité dans tous nos
                produits et services.
              </p>
            </div>

            <div
              style={{
                textAlign: "center",
                padding: "2rem",
                borderRadius: "16px",
                backgroundColor: "#f8fafc",
                border: "1px solid #e2e8f0",
              }}
            >
              <div
                style={{
                  width: "70px",
                  height: "70px",
                  backgroundColor: "#fce7f3",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.5rem auto",
                }}
              >
                <Heart size={35} color="#ec4899" />
              </div>
              <h4
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  color: "#1a202c",
                  marginBottom: "1rem",
                }}
              >
                Passion
              </h4>
              <p
                style={{
                  color: "#64748b",
                  lineHeight: "1.6",
                  margin: 0,
                }}
              >
                Notre amour pour la technologie nous pousse à toujours innover
                et nous améliorer.
              </p>
            </div>
          </div>
        </div>

        {/* Contact liens contact  */}
        <div
          style={{
            backgroundColor: "#0a4580",
            padding: "4rem 2rem",
            textAlign: "center",
            color: "white",
          }}
        >
          <div
            style={{
              maxWidth: "800px",
              margin: "0 auto",
            }}
          >
            <h3
              style={{
                fontWeight: "700",
                marginBottom: "1.5rem",
                margin: "0 0 1.5rem 0",
              }}
            >
              Prêt à découvrir nos produits ?
            </h3>
            <p
              style={{
                fontSize: "1.25rem",
                marginBottom: "2.5rem",
                opacity: "0.9",
                lineHeight: "1.6",
                margin: "0 0 2.5rem 0",
              }}
            >
              Explorez, choisissez, connectez-vous : la technologie qui vous
              correspond est ici.
            </p>
            <Link
              style={{
                textDecoration: "none",
              }}
              href={"/pages/tout_produit/"}
              id="btn_apropos"
            >
              Explorer toute notre boutique 
            </Link>
          </div>
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
                  style={{
                    backgroundColor: "white",
                    padding: "0.90rem",
                    borderRadius: "100%",
                  }}
                >
                  <IoClose size={30} />
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
                              <span
                                style={{ color: "red", fontWeight: "bold" }}
                              >
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
                              Détail
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
      </div>

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
      <Footer />
    </>
  );
}

export default Apropos;

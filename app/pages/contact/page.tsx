"use client";
import React, { useEffect, useState } from "react";
import {
  FiUser,
  FiMail,
  FiMapPin,
  FiPhone,
  FiClock,
  FiHelpCircle,
  FiTool,
  FiUserPlus,
  FiUsers,
  FiShoppingCart,
} from "react-icons/fi";
import Carous1 from "@/app/composants/carous1/page";
import Footer from "@/app/composants/footer/footer";
import Navbar, { NavbarProps } from "@/app/composants/navbar/navbar";
import { IoIosSend } from "react-icons/io";
import useSeachStore from "@/app/store/affiche_Seach";
import { Store_Panier } from "@/app/store/panier";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { IoClose } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { MdRemoveRedEye } from "react-icons/md";
import { Sendmess } from "@/app/controllers/client/contacter_nous";
import { ProduitType1 } from "@/type/produit";

function Contact() {
  const [produits, setProduits] = useState<ProduitType1[]>([]);
  const [produitsFiltres, setproduitsFiltres] = useState<ProduitType1[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [DetailProd, setDetailProd] = useState<ProduitType1>();
  const [mess_seach, setmess_seach] = useState("");
  //les states du formulaire messages
  const [nom, setnom] = useState("");
  const [mail, setmail] = useState("");
  const [message, setmessage] = useState("");
  const [load, setload] = useState(true);

  // store de seach
  const StoreSeach = useSeachStore((state) => state.seach);
  const fermerture = useSeachStore((state) => state.ferme);

  ///les store Panier
  const StorePanier = Store_Panier((state) => state.Store_P);
  const AddStore_P = Store_Panier((state) => state.AddStore_P);
  const compteurPanier = Store_Panier((state) => state.increment);
  const openModal = () => true;

  // fonctionnalité de barre de rereche
  console.log("les lettre de seach == ");
  console.log(search);
  useEffect(() => {
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
      statut: "En attente",
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

  return (
    <>
      <Carous1 />
      <Navbar {...({ onOpenModal: openModal } as NavbarProps)} />

      {/* SECTION HERO */}
      <ToastContainer />
      <section
        className="mt-5"
        style={{
          backgroundColor: "#f5f5f5",
          color: "#333",
          padding: "4rem 0",
          textAlign: "center",
          width: "100%",
        }}
      >
        <div data-aos="flip-left">
          <h3
            data-aos="flip-left"
            style={{
              fontSize: "2rem",
              fontWeight: "700",
              marginBottom: "1rem",
            }}
          >
            Contactez-Nous
          </h3>
        </div>

        <p
          data-aos="flip-left"
          style={{
            fontSize: "1.1rem",
            maxWidth: "600px",
            margin: "0 auto",
            color: "#666",
          }}
        >
          Notre équipe est à votre disposition pour toute question ou demande
          d'information.
        </p>
      </section>

      {/* SECTION CONTACT */}
      <div className="container mt-5 mb-5">
        <div className="row">
          {/* FORMULAIRE */}
          <div data-aos="flip-up" className="col-md-7 mb-5">
            <div
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "12px",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.05)",
                padding: "2rem",
              }}
            >
              <h3
                style={{
                  fontWeight: "bold",
                  marginBottom: "1.5rem",
                  color: "#0d6efd",
                }}
              >
                <FiMail style={{ marginRight: "0.5rem" }} />
                Envoyez-nous un message
              </h3>

              <form
                onSubmit={(e) =>
                  Sendmess(
                    e,
                    nom,
                    mail,
                    message,
                    setload,
                    setnom,
                    setmail,
                    setmessage
                  )
                }
              >
                {/* NOM */}
                <div className="mb-3 position-relative">
                  <label htmlFor="name" className="form-label">
                    Nom
                  </label>
                  <FiUser
                    style={{
                      position: "absolute",
                      top: "42px",
                      left: "15px",
                      color: "#0d6efd",
                      fontSize: "1.2rem",
                    }}
                  />
                  <input
                    value={nom}
                    onChange={(e) => setnom(e.target.value)}
                    required
                    type="text"
                    className="form-control ps-5 shadow-none"
                    id="name"
                    placeholder="Votre nom et prénom"
                    style={{ borderRadius: "8px" }}
                  />
                </div>

                {/* EMAIL */}
                <div className="mb-3 position-relative">
                  <label htmlFor="email" className="form-label">
                    Adresse e-mail
                  </label>
                  <FiMail
                    style={{
                      position: "absolute",
                      top: "42px",
                      left: "15px",
                      color: "#0d6efd",
                      fontSize: "1.2rem",
                    }}
                  />
                  <input
                    required
                    value={mail}
                    onChange={(e) => setmail(e.target.value)}
                    type="email"
                    className="form-control ps-5 shadow-none"
                    id="email"
                    placeholder="name@example.com"
                    style={{ borderRadius: "8px" }}
                  />
                </div>

                {/* MESSAGE */}
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">
                    Message
                  </label>
                  <textarea
                    required
                    value={message}
                    onChange={(e) => setmessage(e.target.value)}
                    className="form-control shadow-none"
                    id="message"
                    rows={5}
                    placeholder="Votre message..."
                    style={{ borderRadius: "8px" }}
                  ></textarea>
                </div>
                {load ? (
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{
                      padding: "0.75rem 2rem",
                      fontWeight: "bold",
                      borderRadius: "8px",
                    }}
                  >
                    Envoyer
                    <IoIosSend className="ms-2" size={20} />
                  </button>
                ) : (
                  <button
                    style={{
                      padding: "0.75rem 2rem",
                      fontWeight: "bold",
                      borderRadius: "8px",
                    }}
                    className="btn btn-primary"
                    type="button"
                    disabled
                  >
                    <span
                      className="spinner-border spinner-border-sm"
                      aria-hidden="true"
                    ></span>
                    <span role="status"> Envoie de message en cours...</span>
                  </button>
                )}
              </form>
            </div>
          </div>

          {/* COORDONNÉES */}
          <div data-aos="flip-down" className="col-md-5">
            <div
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "12px",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.05)",
                padding: "2rem",
              }}
            >
              <h3
                style={{
                  fontWeight: "bold",
                  marginBottom: "1.5rem",
                  color: "#0d6efd",
                }}
              >
                <FiMapPin style={{ marginRight: "0.5rem" }} />
                Nos Coordonnées
              </h3>

              {/* COORDONNÉES LIST */}
              <div className="d-flex flex-column gap-4">
                {/* Adresse */}
                <div className="d-flex align-items-center gap-3">
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      backgroundColor: "#0d6efd",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      flexShrink: 0,
                      fontSize: "1.2rem",
                    }}
                  >
                    <FiMapPin />
                  </div>
                  <div>
                    <p style={{ margin: 0, fontWeight: "bold" }}>Adresse</p>
                    <p style={{ margin: 0 }}>
                      Port-Bouet centre, centre pilote, <br />
                      Abidjan - Côte d'Ivoire
                    </p>
                  </div>
                </div>

                {/* Téléphone */}
                <div className="d-flex align-items-center gap-3">
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      backgroundColor: "#0d6efd",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      flexShrink: 0,
                      fontSize: "1.2rem",
                    }}
                  >
                    <FiPhone />
                  </div>
                  <div>
                    <p style={{ margin: 0, fontWeight: "bold" }}>Téléphone</p>
                    <p style={{ margin: 0 }}>
                      +225 07 01 97 53 50 <br /> +225 05 04 29 32 84
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="d-flex align-items-center gap-3">
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      backgroundColor: "#0d6efd",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      flexShrink: 0,
                      fontSize: "1.2rem",
                    }}
                  >
                    <FiMail />
                  </div>
                  <div>
                    <p style={{ margin: 0, fontWeight: "bold" }}>Email</p>
                    <p style={{ margin: 0 }}>
                      ivoire-tech20@gmail.com <br /> ivoire-tech.com
                    </p>
                  </div>
                </div>

                {/* Horaires */}
                <div className="d-flex align-items-center gap-3">
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      backgroundColor: "#0d6efd",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      flexShrink: 0,
                      fontSize: "1.2rem",
                    }}
                  >
                    <FiClock />
                  </div>
                  <div>
                    <p style={{ margin: 0, fontWeight: "bold" }}>Horaires</p>
                    <p style={{ margin: 0 }}>
                      Lun - Sam: 8h00 - 17h00 <br /> Dim: 9h00 - 15h00
                    </p>
                  </div>
                </div>
              </div>

              {/* Pourquoi Nous Contacter */}
              <h4
                style={{
                  fontWeight: "bold",
                  marginTop: "1.5rem",
                  marginBottom: "1rem",
                  color: "#0d6efd",
                }}
              >
                <FiHelpCircle style={{ marginRight: "0.5rem" }} />
                Pourquoi Nous Contacter ?
              </h4>
              <ul style={{ paddingLeft: 0, listStyleType: "none" }}>
                <li className="mb-2">
                  <FiTool style={{ marginRight: "0.5rem", color: "#0d6efd" }} />
                  Support Technique
                </li>
                <li className="mb-2">
                  <FiUserPlus
                    style={{ marginRight: "0.5rem", color: "#0d6efd" }}
                  />
                  Partenariat Commercial
                </li>
                <li className="mb-2">
                  <FiUsers
                    style={{ marginRight: "0.5rem", color: "#0d6efd" }}
                  />
                  Service Client
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/** modal et contenu de barre de recherche   showModal*/}
      {StoreSeach && (
        <div
          className="modal show fade"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          tabIndex={-1}
        >
          <div className="modal-dialog modal-dialog-centered ">
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
      <Footer />
    </>
  );
}

export default Contact;

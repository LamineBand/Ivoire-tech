"use client";
import React, { use, useEffect, useState } from "react";
import { CiLogout } from "react-icons/ci";
import {
  ShoppingBag,
  CreditCard,
  Star,
  TrendingUp,
  Package,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import Carous1 from "@/app/composants/carous1/page";
import Navbar, { NavbarProps } from "@/app/composants/navbar/navbar";
import axios from "axios";
import { CommandeType } from "@/type/produit";

function DashClient() {
  interface UserInfoType {
    adress: string;
    mail: string;
    nom: string;
    tel: string;
    type: string;
    uid: string;
    ville: string;
  }
  //les variables d'état
  const [userinfo, setuserinfo] = useState<UserInfoType>();
  //const [data, setdata] = useState<CommandeType>();
  const [cmd, setcmd] = useState<CommandeType[]>([]);
  const [total, settotal] = useState(0);
  const [toutcmd, settoutcmd] = useState(true);
  const [show, setShow] = useState(false);
  const [cmdDetail, setcmdDetail] = useState<CommandeType>();

  const opendetail = () => setShow(true);
  const closedetail = () => setShow(false);
  const openModal = () => true;
  //recupération d'info de user dans localstorage
  useEffect(() => {
    const inf = JSON.parse(localStorage.getItem("user")!);
    setuserinfo(inf);
  }, []);
  //fonction de deconnexion
  const handleLogout = async () => {
    await axios.post("/api/deconnexion");
    window.location.href = "/";
  };
  // Données simulées
  const clientData = {
    nom: "Bandaogo Lamine",
    email: "jean.dupont@email.com",
    membre_depuis: "Janvier 2023",
    total_commandes: 15,
    montant_total: 1250.5,
    points_fidelite: 850,
    commandes_recentes: [
      {
        id: "#CMD001",
        date: "12/01/2025",
        montant: 89.99,
        statut: "Livrée",
        produits: ["iPhone Case", "Écouteurs Bluetooth"],
      },
      {
        id: "#CMD002",
        date: "10/01/2025",
        montant: 156.5,
        statut: "En cours",
        produits: ["Sneakers Nike", "T-shirt"],
      },
      {
        id: "#CMD003",
        date: "08/01/2025",
        montant: 45.0,
        statut: "Expédiée",
        produits: ["Livre JavaScript", "Mug"],
      },
    ],
  };

  // recupérations des infos dans la base de données
  async function recup() {
    try {
      const response = await axios.get("/api/recupcmd/");

      if (response?.data?.mess === "ok") {
        const commandes = response.data.cmd;

        const userStr = localStorage.getItem("user");
        if (!userStr) {
          console.warn("Aucun utilisateur trouvé dans le localStorage.");
          return;
        }

        const user = JSON.parse(userStr);
        const uid_user = user.uid;

        const commandesUser = commandes.filter(
          (cmd: any) => cmd.userinfo?.uid === uid_user
        );

        console.log("Commandes de l'utilisateur :", commandesUser);
        setcmd(commandesUser);
        //return commandesUser;
      } else {
        console.log("Aucune donnée reçue ou message différent de 'ok'.");
      }
    } catch (error) {
      console.error(
        "Une erreur est survenue pendant la récupération des données :",
        error
      );
    }
  }

  useEffect(() => {
    recup();
  }, []);

  // calcule de prix total de chaque commande
  useEffect(() => {
    console.log("contenu de cmd=");
    console.log(cmd);
    const total = cmd.reduce((total, p) => total + p.total, 0);
    console.log("prix total");
    console.log(total);
    settotal(total);
  }, [cmd]);

  const getStatusBadge = (statut: string) => {
    switch (statut) {
      case "Livrée":
        return "success";
      case "En cours":
        return "warning";
      case "Expédiée":
        return "info";
      case "Annulée":
        return "danger";
      default:
        return "secondary";
    }
  };

  const getStatusIcon = (statut: string) => {
    switch (statut) {
      case "Livrée":
        return <CheckCircle size={16} />;
      case "En cours":
        return <Clock size={16} />;
      case "Expédiée":
        return <Package size={16} />;
      case "Annulée":
        return <XCircle size={16} />;
      default:
        return <Package size={16} />;
    }
  };

  return (
    <>
      <Carous1 />
      <Navbar {...({ onOpenModal: openModal } as NavbarProps)} />
      {/* Bouton d'ouverture 
        <button className="btn btn-primary" onClick={opendetail}>
                Voir Détails Commande
              </button>
      */}

      {/* Modal */}
      <center>
        {" "}
        {show && (
          <div
            className="modal fade show"
            tabIndex={-1}
            role="dialog"
            style={{
              display: "block",
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          >
            <div
              className="modal-dialog modal-dialog-centered modal-lg"
              role="document"
              style={{
                margin: "1rem",
              }}
            >
              <div
                className="modal-content shadow-sm"
                style={{
                  borderRadius: "12px",
                  fontSize: "16px",
                }}
              >
                {/* Header */}
                <div
                  className="modal-header bg-primary text-white"
                  style={{
                    borderBottom: "none",
                  }}
                >
                  <h5 className="modal-title">Détails de la commande</h5>
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    onClick={closedetail}
                  ></button>
                </div>

                {/* Body */}
                <div className="modal-body">
                  <div className="mb-3 text-start">
                    <p>
                      <strong>Référence :</strong> {cmdDetail?.ref}
                    </p>
                    <p>
                      <strong>Date :</strong> {cmdDetail?.date}
                    </p>
                    <p>
                      <strong>Client :</strong> {cmdDetail?.userinfo.nom}
                    </p>
                    <p>
                      <strong>Statut :</strong>{" "}
                      <span className="badge bg-success">
                        {cmdDetail?.statut}
                      </span>
                    </p>
                  </div>

                  {/* Table */}
                  <div className="table-responsive">
                    <table className="table table-bordered align-middle">
                      <thead className="table-light">
                        <tr>
                          <th>Produit</th>
                          <th>Prix Unitaire</th>
                          <th>Quantité</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cmdDetail?.produits.map((item, index) => (
                          <tr key={index}>
                            <td>{item.nomProduit}</td>
                            <td>{item.prixProduit} FCFA</td>
                            <td>{item.qte}</td>
                            <td>{item.prixProduit * item.qte}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td colSpan={3} className="text-end">
                            <strong>Total Commande</strong>
                          </td>
                          <td>
                            <strong>{cmdDetail?.total}</strong>
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>

                {/* Footer */}
                <div
                  className="modal-footer"
                  style={{
                    borderTop: "none",
                  }}
                >
                  <button className="btn btn-secondary" onClick={closedetail}>
                    Fermer
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </center>
      <div className="container" style={{ marginTop: "7rem" }}>
        {/* En-tête de bienvenue */}
        <div className="row mb-4">
          <div className="col-12">
            <div
              className="card border-0 shadow-sm"
              style={{
                background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
                borderRadius: "15px",
              }}
            >
              <div className="card-body p-4">
                <div className="row align-items-center">
                  <div className="col-md-8 ">
                    <h3 className="fw-bold mb-2" style={{ color: "#2c3e50" }}>
                      {userinfo?.nom}
                    </h3>
                    {/**   <p className="text-muted mb-0">
                      Membre depuis {clientData.membre_depuis} •{" "}
                      {clientData.points_fidelite} points de fidélité
                    </p> */}
                  </div>
                  <div className="col-md-4 text-start ">
                    {/** <div className="d-flex justify-content-end align-items-center">
                      <Star className="text-warning me-2" size={24} />
                      <span className="h5 mb-0" style={{ color: "#f39c12" }}>
                        {clientData.points_fidelite} pts
                      </span>
                    </div> */}
                    <button
                      className="btn btn-outline-danger btn-sm "
                      style={{ borderRadius: "20px", padding: "5px 15px" }}
                      onClick={() => handleLogout()}
                    >
                      <CiLogout className=" fw-bold" /> Déconnexion
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistiques */}
        <div className="row mb-4">
          <div className="col-md-4 mb-3">
            <div
              className="card border-0 shadow-sm h-100"
              style={{ borderRadius: "12px" }}
            >
              <div className="card-body text-center p-4">
                <div
                  className="d-inline-flex align-items-center justify-content-center mb-3"
                  style={{
                    width: "60px",
                    height: "60px",
                    background: "linear-gradient(135deg, #3498db, #2980b9)",
                    borderRadius: "50%",
                    color: "white",
                  }}
                >
                  <ShoppingBag size={24} />
                </div>
                <h3 className="fw-bold mb-1" style={{ color: "#2c3e50" }}>
                  {cmd.length}
                </h3>
                <p className="text-muted mb-0">Commandes totales</p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div
              className="card border-0 shadow-sm h-100"
              style={{ borderRadius: "12px" }}
            >
              <div className="card-body text-center p-4">
                <div
                  className="d-inline-flex align-items-center justify-content-center mb-3"
                  style={{
                    width: "60px",
                    height: "60px",
                    background: "linear-gradient(135deg, #27ae60, #229954)",
                    borderRadius: "50%",
                    color: "white",
                  }}
                >
                  <CreditCard size={24} />
                </div>
                <h3 className="fw-bold mb-1" style={{ color: "#2c3e50" }}>
                  {total.toLocaleString("fr-FR")}CFA
                </h3>
                <p className="text-muted mb-0">Total dépensé</p>
              </div>
            </div>
          </div>

          {/**
           * 
           * <div className="col-md-4 mb-3">
            <div
              className="card border-0 shadow-sm h-100"
              style={{ borderRadius: "12px" }}
            >
              <div className="card-body text-center p-4">
                <div
                  className="d-inline-flex align-items-center justify-content-center mb-3"
                  style={{
                    width: "60px",
                    height: "60px",
                    background: "linear-gradient(135deg, #e74c3c, #c0392b)",
                    borderRadius: "50%",
                    color: "white",
                  }}
                >
                  <TrendingUp size={24} />
                </div>
                <h3 className="fw-bold mb-1" style={{ color: "#2c3e50" }}>
                  {cmd.length > 0 ? (total / cmd.length).toFixed(0) : 0}
                  FCFA
                </h3>
                <p className="text-muted mb-0">Panier moyen</p>
              </div>
            </div>
          </div>
           */}
        </div>

        {/* Commandes récentes */}
        <div className="row mb-5">
          {toutcmd ? (
            <div className="col-12">
              <div
                className="card border-0 shadow-sm"
                style={{ borderRadius: "12px" }}
              >
                <div className="card-header bg-transparent border-0 p-4">
                  <h4 className="fw-bold mb-0" style={{ color: "#2c3e50" }}>
                    Commandes récentes
                  </h4>
                </div>
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table table-hover mb-0">
                      <thead style={{ backgroundColor: "#f8f9fa" }}>
                        <tr>
                          <th
                            className="border-0 fw-semibold ps-4"
                            style={{ color: "#6c757d" }}
                          >
                            Commande
                          </th>
                          <th
                            className="border-0 fw-semibold"
                            style={{ color: "#6c757d" }}
                          >
                            Date
                          </th>
                          <th
                            className="border-0 fw-semibold"
                            style={{ color: "#6c757d" }}
                          >
                            Produits
                          </th>
                          <th
                            className="border-0 fw-semibold"
                            style={{ color: "#6c757d" }}
                          >
                            Montant
                          </th>
                          <th
                            className="border-0 fw-semibold"
                            style={{ color: "#6c757d" }}
                          >
                            Statut
                          </th>
                          <th className="border-0"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {cmd.slice(-4).map((commande, index) => (
                          <tr
                            key={index}
                            style={{ transition: "all 0.2s ease" }}
                          >
                            <td className="ps-4 py-3">
                              <span
                                className="fw-semibold"
                                style={{ color: "#2c3e50" }}
                              >
                                {commande.ref}
                              </span>
                            </td>
                            <td className="py-3">
                              <span className="text-muted">
                                {commande.date}
                              </span>
                            </td>
                            <td className="py-3">
                              <div>
                                {commande.produits
                                  .slice(0, 1)
                                  .map((produit, idx) => (
                                    <span
                                      key={idx}
                                      className="d-block text-muted small"
                                    >
                                      {produit.nomProduit}
                                    </span>
                                  ))}
                                {commande.produits.length > 2 && (
                                  <span className="text-muted small">
                                    +{commande.produits.length - 2} autres
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="py-3">
                              <span
                                className="fw-semibold"
                                style={{ color: "#27ae60" }}
                              >
                                {commande.total.toLocaleString("fr-FR")}FCFA
                              </span>
                            </td>
                            <td className="py-3">
                              {/*getStatusIcon(commande.statut)*/}
                              <span
                                className={`badge d-inline-flex align-items-center gap-1 px-2 py-1 rounded-pill
    ${
      commande.statut === "En cours"
        ? "bg-warning text-dark"
        : commande.statut === "Validé"
        ? "bg-success"
        : commande.statut === "Annulée"
        ? "bg-danger"
        : commande.statut === "Expédiée"
        ? "bg-primary"
        : "bg-secondary"
    }`}
                              >
                                {commande.statut === "En cours" && (
                                  <>
                                    <Clock size={16} />
                                    <span>En cours</span>
                                  </>
                                )}

                                {commande.statut === "Validé" && (
                                  <>
                                    <CheckCircle size={16} />
                                    <span>Validé</span>
                                  </>
                                )}

                                {commande.statut === "Annulée" && (
                                  <>
                                    <XCircle size={16} />
                                    <span>Annulée</span>
                                  </>
                                )}

                                {commande.statut === "Expédiée" && (
                                  <>
                                    <Package size={16} />
                                    <span>Expédiée</span>
                                  </>
                                )}

                                {/* Si aucun statut connu */}
                                {[
                                  "En cours",
                                  "Validé",
                                  "Annulée",
                                  "Expédiée",
                                ].indexOf(commande.statut) === -1 && (
                                  <>
                                    <Package size={16} />
                                    <span>{commande.statut}</span>
                                  </>
                                )}
                              </span>
                            </td>
                            <td className="py-3">
                              <button
                                className="btn btn-outline-primary btn-sm"
                                style={{ borderRadius: "8px" }}
                                onClick={() => {
                                  setcmdDetail(commande);
                                  opendetail();
                                }}
                              >
                                Voir détails
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="card-footer bg-transparent border-0 p-4">
                  <div className="text-center">
                    <button
                      className="btn btn-primary"
                      onClick={() => settoutcmd(false)}
                      style={{
                        borderRadius: "25px",
                        padding: "10px 30px",
                        background: "linear-gradient(135deg, #3498db, #2980b9)",
                        border: "none",
                      }}
                    >
                      Voir toutes les commandes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="col-12">
              <div
                className="card border-0 shadow-sm"
                style={{ borderRadius: "12px" }}
              >
                <div className="card-header bg-transparent border-0 p-4">
                  <h4 className="fw-bold mb-0" style={{ color: "#2c3e50" }}>
                    Toutes les commandes
                  </h4>
                </div>
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table table-hover mb-0">
                      <thead style={{ backgroundColor: "#f8f9fa" }}>
                        <tr>
                          <th
                            className="border-0 fw-semibold ps-4"
                            style={{ color: "#6c757d" }}
                          >
                            Commande
                          </th>
                          <th
                            className="border-0 fw-semibold"
                            style={{ color: "#6c757d" }}
                          >
                            Date
                          </th>
                          <th
                            className="border-0 fw-semibold"
                            style={{ color: "#6c757d" }}
                          >
                            Produits
                          </th>
                          <th
                            className="border-0 fw-semibold"
                            style={{ color: "#6c757d" }}
                          >
                            Montant
                          </th>
                          <th
                            className="border-0 fw-semibold"
                            style={{ color: "#6c757d" }}
                          >
                            Statut
                          </th>
                          <th className="border-0"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {cmd.map((commande, index) => (
                          <tr
                            key={index}
                            style={{ transition: "all 0.2s ease" }}
                          >
                            <td className="ps-4 py-3">
                              <span
                                className="fw-semibold"
                                style={{ color: "#2c3e50" }}
                              >
                                {commande.ref}
                              </span>
                            </td>
                            <td className="py-3">
                              <span className="text-muted">
                                {" "}
                                {commande.date}
                              </span>
                            </td>
                            <td className="py-3">
                              <div>
                                {commande.produits
                                  .slice(0, 1)
                                  .map((produit, idx) => (
                                    <span
                                      key={idx}
                                      className="d-block text-muted small"
                                    >
                                      {produit.nomProduit}
                                    </span>
                                  ))}
                                {commande.produits.length > 2 && (
                                  <span className="text-muted small">
                                    +{commande.produits.length - 2} autres
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="py-3">
                              <span
                                className="fw-semibold"
                                style={{ color: "#27ae60" }}
                              >
                                {commande.total.toLocaleString("fr-FR")}FCFA
                              </span>
                            </td>
                            <td className="py-3">
                              <span
                                className={`badge d-inline-flex align-items-center gap-1 px-2 py-1 rounded-pill
    ${
      commande.statut === "En cours"
        ? "bg-warning text-dark"
        : commande.statut === "Validé"
        ? "bg-success"
        : commande.statut === "Annulée"
        ? "bg-danger"
        : commande.statut === "Expédiée"
        ? "bg-primary"
        : "bg-secondary"
    }`}
                              >
                                {commande.statut === "En cours" && (
                                  <>
                                    <Clock size={16} />
                                    <span>En cours</span>
                                  </>
                                )}

                                {commande.statut === "Validé" && (
                                  <>
                                    <CheckCircle size={16} />
                                    <span>Validé</span>
                                  </>
                                )}

                                {commande.statut === "Annulée" && (
                                  <>
                                    <XCircle size={16} />
                                    <span>Annulée</span>
                                  </>
                                )}

                                {commande.statut === "Expédiée" && (
                                  <>
                                    <Package size={16} />
                                    <span>Expédiée</span>
                                  </>
                                )}

                                {/* Si aucun statut connu */}
                                {[
                                  "En cours",
                                  "Validé",
                                  "Annulée",
                                  "Expédiée",
                                ].indexOf(commande.statut) === -1 && (
                                  <>
                                    <Package size={16} />
                                    <span>{commande.statut}</span>
                                  </>
                                )}
                              </span>
                            </td>
                            <td className="py-3">
                              <button
                                className="btn btn-outline-primary btn-sm"
                                style={{ borderRadius: "8px" }}
                                onClick={() => {
                                  setcmdDetail(commande);
                                  opendetail();
                                }}
                              >
                                Voir détails
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="card-footer bg-transparent border-0 p-4">
                  <div className="text-center">
                    <button
                      className="btn btn-primary"
                      onClick={() => settoutcmd(true)}
                      style={{
                        borderRadius: "25px",
                        padding: "10px 30px",
                        background: "linear-gradient(135deg, #3498db, #2980b9)",
                        border: "none",
                      }}
                    >
                      Voir moins de commandes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Actions rapides 
        <div className="row mt-4 mb-5">
          <div className="col-12">
            <div
              className="card border-0 shadow-sm"
              style={{ borderRadius: "12px" }}
            >
              <div className="card-body p-4">
                <h5 className="fw-bold mb-3" style={{ color: "#2c3e50" }}>
                  Actions rapides
                </h5>
                <div className="row">
                  <div className="col-md-3 col-6 mb-3">
                    <button
                      className="btn btn-outline-primary w-100 h-100 d-flex flex-column align-items-center justify-content-center"
                      style={{ minHeight: "80px", borderRadius: "10px" }}
                    >
                      <Package size={20} className="mb-2" />
                      <span className="small">Suivre une commande</span>
                    </button>
                  </div>
                  <div className="col-md-3 col-6 mb-3">
                    <button
                      className="btn btn-outline-secondary w-100 h-100 d-flex flex-column align-items-center justify-content-center"
                      style={{ minHeight: "80px", borderRadius: "10px" }}
                    >
                      <Heart size={20} className="mb-2" />
                      <span className="small">Mes favoris</span>
                    </button>
                  </div>
                  <div className="col-md-3 col-6 mb-3">
                    <button
                      className="btn btn-outline-success w-100 h-100 d-flex flex-column align-items-center justify-content-center"
                      style={{ minHeight: "80px", borderRadius: "10px" }}
                    >
                      <CreditCard size={20} className="mb-2" />
                      <span className="small">Mes paiements</span>
                    </button>
                  </div>
                  <div className="col-md-3 col-6 mb-3">
                    <button
                      className="btn btn-outline-warning w-100 h-100 d-flex flex-column align-items-center justify-content-center"
                      style={{ minHeight: "80px", borderRadius: "10px" }}
                    >
                      <Star size={20} className="mb-2" />
                      <span className="small">Mes avis</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>*/}
      </div>
    </>
  );
}

export default DashClient;

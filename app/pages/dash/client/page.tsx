"use client";
import React, { useEffect, useState } from "react";
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
  Heart,
} from "lucide-react";
import Carous1 from "@/app/composants/carous1/page";
import Navbar, { NavbarProps } from "@/app/composants/navbar/navbar";
import axios from "axios";

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
  const [userinfo, setuserinfo] = useState<UserInfoType>();
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
                  <div className="col-md-4 text-end ">
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
                  {clientData.total_commandes}
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
                  {clientData.montant_total.toLocaleString("fr-FR")}€
                </h3>
                <p className="text-muted mb-0">Total dépensé</p>
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
                    background: "linear-gradient(135deg, #e74c3c, #c0392b)",
                    borderRadius: "50%",
                    color: "white",
                  }}
                >
                  <TrendingUp size={24} />
                </div>
                <h3 className="fw-bold mb-1" style={{ color: "#2c3e50" }}>
                  {(
                    clientData.montant_total / clientData.total_commandes
                  ).toFixed(0)}
                  €
                </h3>
                <p className="text-muted mb-0">Panier moyen</p>
              </div>
            </div>
          </div>
        </div>

        {/* Commandes récentes */}
        <div className="row mb-5">
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
                      {clientData.commandes_recentes.map((commande, index) => (
                        <tr key={index} style={{ transition: "all 0.2s ease" }}>
                          <td className="ps-4 py-3">
                            <span
                              className="fw-semibold"
                              style={{ color: "#2c3e50" }}
                            >
                              {commande.id}
                            </span>
                          </td>
                          <td className="py-3">
                            <span className="text-muted">{commande.date}</span>
                          </td>
                          <td className="py-3">
                            <div>
                              {commande.produits.map((produit, idx) => (
                                <span
                                  key={idx}
                                  className="d-block text-muted small"
                                >
                                  {produit}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="py-3">
                            <span
                              className="fw-semibold"
                              style={{ color: "#27ae60" }}
                            >
                              {commande.montant.toLocaleString("fr-FR")}€
                            </span>
                          </td>
                          <td className="py-3">
                            <span
                              className={`badge bg-${getStatusBadge(
                                commande.statut
                              )} d-inline-flex align-items-center`}
                            >
                              {getStatusIcon(commande.statut)}
                              <span className="ms-2">{commande.statut}</span>
                            </span>
                          </td>
                          <td className="py-3">
                            <button
                              className="btn btn-outline-primary btn-sm"
                              style={{ borderRadius: "8px" }}
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

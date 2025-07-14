"use client";

import React, { useEffect, useState } from "react";
import "./css/dash.css";

import Navdash from "../dash/vendeur/navbar/navbarVendeur";
import Sidebar from "../dash/vendeur/sidbar/page";
import { VendeurType } from "@/type/type";

export default function VendeurDashboard() {
  const [user, setuser] = useState<VendeurType>();
  const boutique = user?.nomBoutique;
  useEffect(() => {
    const req = JSON.parse(localStorage.getItem("user")!) || [];
    console.log("info dans dash = ");
    setuser(req);
    console.log(req);
  }, []);
  return (
    <div className="container-fluid">
      {/* Header */}
      <Navdash bout={boutique} />
      {/* Page layout */}
      <div className="row" style={{ paddingTop: "70px" }}>
        {/* Sidebar */}
        <div className="col-md-2">
          <Sidebar />
        </div>
        {/* Contenu principal */}
        <main className="col-md-10 px-4 py-4">
          <h2 className="mb-4"> {user && user.nom} </h2>

          {/* Statistiques */}
          <div className="row g-4 mb-4">
            <div className="col-md-3">
              <div className="card shadow-sm text-center">
                <div className="card-body">
                  <h5 className="card-title">Ventes du jour</h5>
                  <p className="fs-4 fw-bold">25</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card shadow-sm text-center">
                <div className="card-body">
                  <h5 className="card-title">Revenus</h5>
                  <p className="fs-4 fw-bold">75 000 CFA</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card shadow-sm text-center">
                <div className="card-body">
                  <h5 className="card-title">Produits en stock</h5>
                  <p className="fs-4 fw-bold">120</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card shadow-sm text-center">
                <div className="card-body">
                  <h5 className="card-title">Commandes en attente</h5>
                  <p className="fs-4 fw-bold">8</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tableau des commandes */}
          <div className="card shadow-sm">
            <div className="card-header bg-white fw-bold">
              Dernières commandes
            </div>
            <div className="card-body table-responsive">
              <table className="table table-responsive table-striped align-middle">
                <thead>
                  <tr>
                    <th>Client</th>
                    <th>Produit</th>
                    <th>Quantité</th>
                    <th>Total</th>
                    <th>Date</th>
                    <th>Statut</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Aminata</td>
                    <td>Sourie gaming</td>
                    <td>1</td>
                    <td>35 000 CFA</td>
                    <td>24 Juin 2025</td>
                    <td>
                      <span className="badge bg-warning text-dark">
                        En attente
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Joseph</td>
                    <td>Clavier</td>
                    <td>2</td>
                    <td>20 000 CFA</td>
                    <td>23 Juin 2025</td>
                    <td>
                      <span className="badge bg-success">Livré</span>
                    </td>
                  </tr>
                  {/* autres lignes... */}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

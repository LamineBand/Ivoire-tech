"use client";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Store_Panier } from "@/app/store/panier";
import Link from "next/link";
import { IoMdArrowBack } from "react-icons/io";

function Checkout() {
  interface ClientType {
    nom: string;
    tel: string;
    adresse: string;
    ville: string;
  }
  const StorePanier = Store_Panier((state) => state.Store_P);
  const [userinfo, setuserinfo] = useState<ClientType>();
  useEffect(() => {
    const info = JSON.parse(localStorage.getItem("user")!);
    setuserinfo(info);
  }, []);
  const total = StorePanier.reduce(
    (acc, prod) => acc + prod.prixProduit * prod.qte,
    0
  );
  const [formData, setFormData] = useState({
    email: "",
    Nom: "",
    lastName: "",
    address: "",
    city: "",
    tel: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Commande validée!");
  };

  return (
    <div
      style={{
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <div className="container">
        <div className="text-center mb-4">
          <h1 style={{ color: "#343a40" }}>Ivoire-tech</h1>
          <p style={{ color: "#6c757d" }}>Finaliser votre commande</p>
        </div>

        <div className="row">
          {/* Formulaire */}
          <div className="col-lg-8">
            <form onSubmit={handleSubmit}>
              {/* Contact 
              <div className="card mb-4">
                <div className="card-header">
                  <h5>Contact</h5>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="votre@email.com"
                      required
                    />
                  </div>
                </div>
              </div>
*/}
              {/* Adresse */}
              <div className="card mb-4">
                <div className="card-header">
                  <h5>Adresse de livraison</h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Nom :</label>
                      <br />
                      <span>
                        <b> {userinfo?.nom}</b>
                      </span>
                      {/**  <input
                        type="text"
                        name="firstName"
                        className="form-control"
                        value={formData.Nom}
                        onChange={handleInputChange}
                        required
                      /> */}
                    </div>
                    {/**
                     *   <div className="col-md-6 mb-3">
                      <label className="form-label">Nom</label>
                      <input
                        type="text"
                        name="lastName"
                        className="form-control"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                     */}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Adresse :</label>
                    <br />
                    <span>
                      <b>{userinfo?.adresse}</b>
                    </span>
                    {/**      <input
                      type="text"
                      name="address"
                      className="form-control"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    /> */}
                  </div>
                  <div className="row">
                    <div className="col-md-8 mb-3">
                      <label className="form-label">Ville :</label>
                      <br />
                      <span>
                        {" "}
                        <b>{userinfo?.ville}</b>
                      </span>
                      {/**
                   *     <input
                        type="text"
                        name="city"
                        className="form-control"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                      />
                      
                   */}
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label">
                        Numéro de téléphone :
                      </label>
                      <br />
                      <span>
                        <b>{userinfo?.tel}</b>
                      </span>
                      {/**
                 *       <input
                        type="telephone"
                        name="telephone"
                        className="form-control"
                        value={formData.tel}
                        onChange={handleInputChange}
                        required
                      />
                 */}
                    </div>
                  </div>
                </div>
              </div>
              {/**bouton de retour a la page d'accueil */}
              <Link
                href="/"
                className="btn"
                style={{
                  backgroundColor: "#f8f9fa", // Gris clair Bootstrap par défaut
                  color: "#555",
                  border: "1px solid #ddd",
                  padding: "0.5rem 1rem",
                  borderRadius: "0.25rem",
                  textDecoration: "none",
                }}
              >
                <IoMdArrowBack /> Continuer mes achats
              </Link>
              {/* Paiement */}
            </form>
          </div>

          {/* Résumé commande */}
          <div className="col-lg-4">
            <div className="card">
              <div className="card-header">
                <h5>Résumé de commande</h5>
              </div>
              <div className="card-body">
                {/* Produit 1 */}
                {StorePanier.map((item) => (
                  <div
                    className="d-flex align-items-center mb-3"
                    key={item._id}
                  >
                    <img
                      src={item.imageProduit}
                      alt={item.nomProduit}
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                    <div className="ms-3 flex-grow-1">
                      <h6 className="mb-0">{item.nomProduit}</h6>
                      <small className="text-muted">Quantité: {item.qte}</small>
                    </div>
                    <span className="fw-bold">
                      {" "}
                      {item.prixProduit * item.qte} FCFA{" "}
                    </span>
                  </div>
                ))}

                <hr />

                {/* Totaux */}
                <div className="d-flex justify-content-between mb-2">
                  <span>Sous-total</span>
                  <span> {total} FCFA</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Livraison</span>
                  <span>2 000 FCFA</span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span>TVA</span>
                  <span> 0 FCFA</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-4">
                  <span className="fw-bold fs-5">Total</span>
                  <span className="fw-bold fs-5 text-primary">
                    {" "}
                    {total + 2000} FCFA
                  </span>
                </div>

                <button
                  type="submit"
                  className="btn  w-100"
                  style={{
                    padding: "12px",
                    backgroundColor: "#ff6f00",
                    fontWeight: "bold",
                    color: "#fff",
                  }}
                  onClick={() => handleSubmit}
                >
                  Finaliser la commande
                </button>

                <p
                  className="text-center text-muted mt-3"
                  style={{ fontSize: "0.8rem" }}
                >
                  Paiement sécurisé SSL
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;

"use client";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
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
          <h1 style={{ color: "#343a40" }}>TechStore</h1>
          <p style={{ color: "#6c757d" }}>Finaliser votre commande</p>
        </div>

        <div className="row">
          {/* Formulaire */}
          <div className="col-lg-8">
            <form onSubmit={handleSubmit}>
              {/* Contact */}
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

              {/* Adresse */}
              <div className="card mb-4">
                <div className="card-header">
                  <h5>Adresse de livraison</h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Prénom</label>
                      <input
                        type="text"
                        name="firstName"
                        className="form-control"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
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
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Adresse</label>
                    <input
                      type="text"
                      name="address"
                      className="form-control"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="row">
                    <div className="col-md-8 mb-3">
                      <label className="form-label">Ville</label>
                      <input
                        type="text"
                        name="city"
                        className="form-control"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Code postal</label>
                      <input
                        type="text"
                        name="postalCode"
                        className="form-control"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Paiement */}
              <div className="card mb-4">
                <div className="card-header">
                  <h5>Paiement</h5>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <label className="form-label">Numéro de carte</label>
                    <input
                      type="text"
                      name="cardNumber"
                      className="form-control"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      required
                    />
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Date d'expiration</label>
                      <input
                        type="text"
                        name="expiryDate"
                        className="form-control"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        placeholder="MM/AA"
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">CVV</label>
                      <input
                        type="text"
                        name="cvv"
                        className="form-control"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
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
                <div className="d-flex align-items-center mb-3">
                  <img
                    src="https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=80"
                    alt="MacBook"
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                  <div className="ms-3 flex-grow-1">
                    <h6 className="mb-0">MacBook Pro</h6>
                    <small className="text-muted">Quantité: 1</small>
                  </div>
                  <span className="fw-bold">1999€</span>
                </div>

                {/* Produit 2 */}
                <div className="d-flex align-items-center mb-3">
                  <img
                    src="https://images.pexels.com/photos/8534088/pexels-photo-8534088.jpeg?auto=compress&cs=tinysrgb&w=80"
                    alt="AirPods"
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                  <div className="ms-3 flex-grow-1">
                    <h6 className="mb-0">AirPods Pro</h6>
                    <small className="text-muted">Quantité: 1</small>
                  </div>
                  <span className="fw-bold">249€</span>
                </div>

                <hr />

                {/* Totaux */}
                <div className="d-flex justify-content-between mb-2">
                  <span>Sous-total</span>
                  <span>2248€</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Livraison</span>
                  <span>15€</span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span>TVA</span>
                  <span>180€</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-4">
                  <span className="fw-bold fs-5">Total</span>
                  <span className="fw-bold fs-5 text-primary">2443€</span>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  style={{ padding: "12px" }}
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

export default App;

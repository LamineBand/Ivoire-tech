"use client";

import React from "react";
import { FaStore } from "react-icons/fa";
import { RiShoppingBag4Line } from "react-icons/ri";
function Footer() {
  return (
    <>
      {/* Bootstrap CSS CDN */}
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
        rel="stylesheet"
      />

      <footer
        style={{
          background: "#073463",
          color: "#ffffff",
          marginTop: "auto",
        }}
      >
        {/* Main Footer Content "#111827" */}
        <div className="container py-5 ">
          <div className="row g-4 ">
            {/* Company Info */}
            <div className="col-lg-6 col-md-8 ">
              <h5
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                  marginBottom: "1.5rem",
                  fontSize: "1.5rem",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FaStore className="me-2 mb-1" />
                {/**<i className="fas fa-laptop-code "></i> */}
                Ivoire Tech
              </h5>
              <p
                style={{
                  lineHeight: "1.6",
                  color: "#b8c5d1",
                  marginBottom: "1rem",
                }}
              >
                Votre partenaire technologique de confiance en Côte d'Ivoire.
                Nous proposons les dernières innovations technologiques pour
                répondre à tous vos besoins digitaux.
              </p>
              <div style={{ marginBottom: "1rem" }}>
                <i
                  className="fas fa-map-marker-alt me-2"
                  style={{ color: "#fff" }}
                ></i>
                <span style={{ color: "#b8c5d1" }}>Abidjan, Côte d'Ivoire</span>
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <i className="fas fa-phone me-2" style={{ color: "#fff" }}></i>
                <span style={{ color: "#b8c5d1" }}>+225 07 01 97 53 50</span>
              </div>
              <div>
                <i
                  className="fas fa-envelope me-2"
                  style={{ color: "#fff" }}
                ></i>
                <span style={{ color: "#b8c5d1" }}>contact@ivoiretech.ci</span>
              </div>
            </div>

            {/* Navigation */}
            <div className="col-lg-2 col-md-2 ">
              <h6
                style={{
                  color: "#fff",
                  fontWeight: " bold",
                  marginBottom: "1.5rem",
                  textTransform: "uppercase",
                  fontSize: "0.9rem",
                  letterSpacing: "1px",
                }}
              >
                Navigation
              </h6>
              <ul className="list-unstyled">
                {[
                  { label: "Accueil", href: "/" },
                  { label: "Produits", href: "/pages/tout_produit/" },
                  { label: "À propos", href: "/pages/apropos/" },
                  { label: "Contact", href: "/pages/contact/" },
                ].map((link, index) => (
                  <li key={index} style={{ marginBottom: "0.5rem" }}>
                    <a
                      href={link.href}
                      style={{
                        color: "#b8c5d1",
                        textDecoration: "none",
                        fontSize: "0.9rem",
                        transition: "color 0.3s ease",
                      }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* medias sociaux */}
            <div className="col-lg-4 col-md-6">
              <div style={{ marginTop: "" }}>
                <h6
                  style={{
                    color: "#fff",
                    fontWeight: "bold",
                    marginBottom: "1rem",
                    textTransform: "uppercase",
                    fontSize: "0.9rem",
                    letterSpacing: "1px",
                  }}
                >
                  Suivez-nous
                </h6>
                <div className="d-flex gap-3">
                  {[
                    { icon: "fab fa-facebook-f", color: "#3b5998" },
                    { icon: "fab fa-twitter", color: "#1da1f2" },
                    { icon: "fab fa-instagram", color: "#e4405f" },
                    { icon: "fab fa-linkedin-in", color: "#0077b5" },
                    { icon: "fab fa-youtube", color: "#ff0000" },
                  ].map((social, index) => (
                    <a
                      key={index}
                      href="#"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        background: "rgba(255, 255, 255, 0.1)",
                        color: "#b8c5d1",
                        textDecoration: "none",
                        transition: "all 0.3s ease",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                      }}
                    >
                      <i className={social.icon}></i>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div className="">{/* Social Media */}</div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            background: "rgba(0, 0, 0, 0.2)",
          }}
        >
          <div className="container py-4">
            <div
              className="row"
              style={{
                alignItems: "center",
                textAlign: "center",
                justifyContent: "center",
                margin: "0",
              }}
            >
              {" "}
              <div className="">
                <p
                  style={{
                    color: "#fff",
                    fontSize: "0.85rem",
                    margin: "0",
                  }}
                >
                  © 2024 Ivoire Tech. Tous droits réservés.
                </p>
              </div>
              <div className="">
                <p
                  style={{
                    color: "#b8c5d1",
                    fontSize: "0.85rem",
                    margin: "0",
                  }}
                >
                  Conçu par Bandaogo Lamine
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods
        <div
          style={{
            background: "rgba(0, 0, 0, 0.3)",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <div className="container py-3">
            <div className="row align-items-center">
              <div className="col-md-8">
                <div className="d-flex align-items-center gap-3 flex-wrap">
                  <span
                    style={{
                      color: "#b8c5d1",
                      fontSize: "0.85rem",
                      fontWeight: "500",
                    }}
                  >
                    Moyens de paiement acceptés :
                  </span>
                  <div className="d-flex gap-2">
                    {[
                      "fab fa-cc-visa",
                      "fab fa-cc-mastercard",
                      "fab fa-cc-paypal",
                      "fas fa-mobile-alt",
                    ].map((payment, index) => (
                      <div
                        key={index}
                        style={{
                          background: "rgba(255, 255, 255, 0.1)",
                          padding: "6px 10px",
                          borderRadius: "4px",
                          border: "1px solid rgba(255, 255, 255, 0.2)",
                        }}
                      >
                        <i
                          className={payment}
                          style={{
                            color: "#b8c5d1",
                            fontSize: "1.2rem",
                          }}
                        ></i>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-md-4 text-md-end mt-2 mt-md-0">
                <div className="d-flex align-items-center justify-content-md-end gap-2">
                  <i
                    className="fas fa-shield-alt"
                    style={{ color: "#28a745" }}
                  ></i>
                  <span
                    style={{
                      color: "#b8c5d1",
                      fontSize: "0.8rem",
                    }}
                  >
                    Paiement 100% sécurisé
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </footer>
    </>
  );
}

export default Footer;

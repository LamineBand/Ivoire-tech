"use client";
import React from "react";
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
} from "react-icons/fi";
import Carous1 from "@/app/composants/carous1/page";
import Footer from "@/app/composants/footer/footer";
import Navbar, { NavbarProps } from "@/app/composants/navbar/navbar";
import { IoIosSend } from "react-icons/io";

function Contact() {
  const openModal = () => true;

  return (
    <>
      <Carous1 />
      <Navbar {...({ onOpenModal: openModal } as NavbarProps)} />

      {/* SECTION HERO */}
      <section
        className="mt-5"
        style={{
          backgroundColor: "#f5f5f5",
          color: "#333",
          padding: "4rem 0",
          textAlign: "center",
        }}
      >
        <h3
          style={{
            fontSize: "2rem",
            fontWeight: "700",
            marginBottom: "1rem",
          }}
        >
          Contactez-Nous
        </h3>
        <p
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
      <div className="container" style={{ padding: "4rem 0" }}>
        <div className="row">
          {/* FORMULAIRE */}
          <div className="col-md-7 mb-5">
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

              <form>
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
                    type="text"
                    className="form-control ps-5 shadow-none"
                    id="name"
                    placeholder="Votre nom"
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
                    className="form-control shadow-none"
                    id="message"
                    rows={5}
                    placeholder="Votre message..."
                    style={{ borderRadius: "8px" }}
                  ></textarea>
                </div>

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
              </form>
            </div>
          </div>

          {/* COORDONNÉES */}
          <div className="col-md-5">
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

      <Footer />
    </>
  );
}

export default Contact;

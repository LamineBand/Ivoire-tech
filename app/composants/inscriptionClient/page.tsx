"use client";
import Link from "next/link";
import React, { useState } from "react";
//import "./css/ins.module.css";
import { AiOutlineClose } from "react-icons/ai";
import {
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaHome,
  FaLock,
  FaPhone,
  FaUser,
} from "react-icons/fa";

function InscriptionClient() {
  const [showPassword, setShowPassword] = useState(false);

  const toggleVisibility = () => setShowPassword(!showPassword);
  return (
    <>
      <div className="container-fluide" id="container_General">
        <div className="row" id="ligne">
          <div className="col-lg-6">
            <div id="i3">
              <div
                style={{
                  textAlign: "center",
                  justifyContent: "center",
                  alignItems: "center",
                  justifyItems: "center",
                }}
                id="textLogin"
              >
                <h3
                  className="mb-5"
                  style={{ color: "white", fontWeight: "bold" }}
                >
                  Vous ête déjà inscrit ?
                </h3>
                <p>
                  <Link
                    id="lienIns"
                    style={{
                      padding: "1rem",
                      border: "solid 2px",
                      borderColor: "#fff",
                      borderRadius: "2rem",
                      textDecoration: "none",
                      fontSize: "1.3rem",
                      fontWeight: "bold",
                    }}
                    href={"/composants/loginClient"}
                  >
                    {" "}
                    Connectez-vous ici{" "}
                  </Link>
                </p>
                <p className="mt-5">
                  <Link
                    id="lienVendeur"
                    href={"#"}
                    style={{
                      fontSize: "1.3rem",
                      color: "white",
                    }}
                  >
                    {" "}
                    Cliquez ici si vous êtes un vendeur{" "}
                  </Link>
                </p>
              </div>
            </div>{" "}
          </div>
          <div className="col-lg-6">
            {" "}
            <center>
              <center>
                <Link id="croix" href={"/"} className="m-2">
                  <AiOutlineClose />
                </Link>
                <h1 className="mb-3 mt-3 fw-bold">Inscription</h1>
              </center>
              <form className="row g-3" id="formLoginIns">
                {/* Nom */}
                <div className="col-md-6 position-relative">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control shadow-none pe-5"
                      id="inputNom"
                      placeholder="Nom"
                    />
                    <label htmlFor="inputNom">Nom</label>
                    <FaUser
                      className="position-absolute top-50 end-0 translate-middle-y me-3 text-secondary"
                      size={16}
                    />
                  </div>
                </div>

                {/* Prénom */}
                <div className="col-md-6 position-relative">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control shadow-none pe-5"
                      id="inputPrenom"
                      placeholder="Prénom"
                    />
                    <label htmlFor="inputPrenom">Prénom</label>
                    <FaUser
                      className="position-absolute top-50 end-0 translate-middle-y me-3 text-secondary"
                      size={16}
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="col-md-6 position-relative">
                  <div className="form-floating">
                    <input
                      type="email"
                      className="form-control shadow-none pe-5"
                      id="inputEmail"
                      placeholder="Email"
                    />
                    <label htmlFor="inputEmail">Email</label>
                    <FaEnvelope
                      className="position-absolute top-50 end-0 translate-middle-y me-3 text-secondary"
                      size={16}
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="col-md-6 position-relative">
                  <div className="form-floating">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control shadow-none pe-5"
                      id="inputPassword"
                      placeholder="Mot de passe"
                    />
                    <label htmlFor="inputPassword">Mot de passe</label>

                    {/* Icône œil (cliquable) */}
                    <span
                      className="position-absolute top-50 end-0 translate-middle-y me-2 text-secondary"
                      style={{ cursor: "pointer" }}
                      onClick={toggleVisibility}
                    >
                      {showPassword ? (
                        <FaEyeSlash size={20} />
                      ) : (
                        <FaEye size={20} />
                      )}
                    </span>
                  </div>
                </div>

                {/* Adresse */}
                <div className="col-12 position-relative">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control shadow-none pe-5"
                      id="inputAddress"
                      placeholder="Adresse"
                    />
                    <label htmlFor="inputAddress">Adresse</label>
                    <FaHome
                      className="position-absolute top-50 end-0 translate-middle-y me-3 text-secondary"
                      size={16}
                    />
                  </div>
                </div>

                {/* Téléphone */}
                <div className="col-12 position-relative">
                  <div className="form-floating">
                    <input
                      type="tel"
                      className="form-control shadow-none pe-5"
                      id="inputTelephone"
                      placeholder="Téléphone"
                    />
                    <label htmlFor="inputTelephone">Téléphone</label>
                    <FaPhone
                      className="position-absolute top-50 end-0 translate-middle-y me-3 text-secondary"
                      size={16}
                    />
                  </div>
                </div>

                {/* Bouton */}
                <div className="col-12">
                  <button
                    type="submit"
                    className="btn btn-primary w-100 fw-bold"
                  >
                    <h5> S'inscrire</h5>
                  </button>
                </div>
              </form>
            </center>{" "}
          </div>
        </div>
      </div>
    </>
  );
}

export default InscriptionClient;

"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  AiOutlineClose,
  AiOutlineUser,
  AiOutlineMail,
  AiOutlineLock,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";

import styles from "./css/logV.module.css";
import { InsClient } from "@/app/controllers/client/inscriptionClient";

function InscriptionClient() {
  const [showPassword, setShowPassword] = useState(false);
  const [mail, setmail] = useState("");
  const [mdp, setmdp] = useState("");
  const [nom, setnom] = useState("");
  const [adresse, setAdresse] = useState("");
  const [ville, setVille] = useState("");
  const [telephone, setTelephone] = useState("");

  const [mess, setmess] = useState("");
  const [load, setload] = useState(false);

  return (
    <div className={styles.pageWrapper}>
      {/* Croix retour accueil */}
      <Link
        href="/"
        className={styles.closeLink}
        aria-label="Annuler et revenir à l'accueil"
      >
        <AiOutlineClose size={24} />
      </Link>

      <div className={styles.loginBox}>
        <h2>Inscription Client</h2>
        <form
          onSubmit={(e) =>
            InsClient(
              e,
              nom,
              mail,
              mdp,
              adresse,
              ville,
              telephone,
              setload,
              setmess,
              setnom,
              setmdp,
              setmail,
              setVille,
              setAdresse,
              setTelephone
            )
          }
        >
          {/* Nom complet */}
          <div style={{ marginBottom: "1rem", position: "relative" }}>
            <AiOutlineUser
              size={20}
              style={{
                position: "absolute",
                top: "50%",
                left: "10px",
                transform: "translateY(-50%)",
                color: "#888",
              }}
            />
            <input
              value={nom}
              onChange={(e) => setnom(e.target.value)}
              type="text"
              placeholder="Nom complet"
              required
              style={{
                width: "100%",
                padding: "0.8rem 0.8rem 0.8rem 2.5rem",
                borderRadius: "8px",
                border: "1px solid #ccc",
                outline: "none",
              }}
            />
          </div>
          {/* Adresse */}
          <div style={{ marginBottom: "1rem", position: "relative" }}>
            <input
              value={adresse}
              onChange={(e) => setAdresse(e.target.value)}
              type="text"
              placeholder="Adresse"
              required
              style={{
                width: "100%",
                padding: "0.8rem",
                borderRadius: "8px",
                border: "1px solid #ccc",
                outline: "none",
              }}
            />
          </div>

          {/* Ville */}
          <div style={{ marginBottom: "1rem", position: "relative" }}>
            <input
              value={ville}
              onChange={(e) => setVille(e.target.value)}
              type="text"
              placeholder="Ville"
              required
              style={{
                width: "100%",
                padding: "0.8rem",
                borderRadius: "8px",
                border: "1px solid #ccc",
                outline: "none",
              }}
            />
          </div>

          {/* Téléphone */}
          <div style={{ marginBottom: "1rem", position: "relative" }}>
            <input
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              type="tel"
              placeholder="Téléphone"
              required
              style={{
                width: "100%",
                padding: "0.8rem",
                borderRadius: "8px",
                border: "1px solid #ccc",
                outline: "none",
              }}
            />
          </div>

          {/* Email */}
          <div style={{ marginBottom: "1rem", position: "relative" }}>
            <AiOutlineMail
              size={20}
              style={{
                position: "absolute",
                top: "50%",
                left: "10px",
                transform: "translateY(-50%)",
                color: "#888",
              }}
            />
            <input
              value={mail}
              onChange={(e) => setmail(e.target.value)}
              type="email"
              placeholder="Email"
              required
              style={{
                width: "100%",
                padding: "0.8rem 0.8rem 0.8rem 2.5rem",
                borderRadius: "8px",
                border: "1px solid #ccc",
                outline: "none",
              }}
            />
          </div>

          {/* Mot de passe */}
          <div style={{ marginBottom: "1rem", position: "relative" }}>
            <AiOutlineLock
              size={20}
              style={{
                position: "absolute",
                top: "50%",
                left: "10px",
                transform: "translateY(-50%)",
                color: "#888",
              }}
            />
            <input
              value={mdp}
              onChange={(e) => setmdp(e.target.value)}
              type={showPassword ? "text" : "password"}
              placeholder="Mot de passe"
              required
              style={{
                width: "100%",
                padding: "0.8rem 2.5rem 0.8rem 2.5rem",
                borderRadius: "8px",
                border: "1px solid #ccc",
                outline: "none",
              }}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                top: "50%",
                right: "10px",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "#888",
              }}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </span>
          </div>

          {/* Bouton s’inscrire */}
          {!load ? (
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "0.8rem",
                backgroundColor: "#ff6f00",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Inscription
            </button>
          ) : (
            <button
              className="btn "
              type="button"
              disabled
              style={{
                width: "100%",
                padding: "0.8rem",
                backgroundColor: "#ff6f00",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              <span
                className="spinner-border spinner-border-sm"
                aria-hidden="true"
              ></span>
              <span role="status">Inscription en cours...</span>
            </button>
          )}
        </form>
        <div className="mt-3" style={{ color: "red" }}>
          {mess}
        </div>
        <div className="mt-3">
          <p>
            Vous avez déjà créé un compte ? <br />
            <Link href={"/composants/login"}>Connectez-vous</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default InscriptionClient;

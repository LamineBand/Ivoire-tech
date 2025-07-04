"use client";

import React, { useState } from "react";
import styles from "./css/logV.module.css";
import Link from "next/link";
import {
  AiOutlineClose,
  AiOutlineMail,
  AiOutlineLock,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";

function LogVendeur() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className={styles.pageWrapper}>
      {/* Croix pour revenir à l'accueil */}
      <Link
        href="/"
        className={styles.closeLink}
        aria-label="Retour à l’accueil"
      >
        <AiOutlineClose size={24} />
      </Link>

      <div className={styles.loginBox}>
        <h2>Connexion Vendeur</h2>
        <form>
          {/* Champ Email */}
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
              type="email"
              placeholder="Email"
              style={{
                width: "100%",
                padding: "0.8rem 0.8rem 0.8rem 2.5rem",
                borderRadius: "8px",
                border: "1px solid #ccc",
                outline: "none",
              }}
            />
          </div>

          {/* Champ Mot de passe */}
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
              type={showPassword ? "text" : "password"}
              placeholder="Mot de passe"
              style={{
                width: "100%",
                padding: "0.8rem 2.5rem 0.8rem 2.5rem",
                borderRadius: "8px",
                border: "1px solid #ccc",
                outline: "none",
              }}
            />
            <span
              onClick={togglePasswordVisibility}
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
            Se connecter
          </button>
        </form>

        <div className="mt-3">
          <p>
            Vous n'avez pas de compte ?{" "}
            <Link href={"/composants/vendeur/ins"}>Cliquez ici</Link>
          </p>
        </div>

        <div className="mt-3">
          <p>
            <Link href="#">Mot de passe oublié ?</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LogVendeur;

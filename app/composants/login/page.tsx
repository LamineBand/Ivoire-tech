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
import { LoginAll } from "@/app/controllers/login";
import { useRouter } from "next/navigation";

function LogVendeur() {
  const [showPassword, setShowPassword] = useState(false);
  const [mail, setmail] = useState("");
  const [mdp, setmdp] = useState("");
  const [load, setload] = useState(false);
  const [mess, setmess] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const route = useRouter();
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
        <h2 className="mb-3">Connexion </h2>
        <form onSubmit={(e) => LoginAll(e, mail, mdp, setload, route, setmess)}>
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
              Se connecter
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
              <span role="status">Connexion en cours...</span>
            </button>
          )}
        </form>
        <div className="mt-3">
          <span style={{ color: "red" }}> {mess} </span>
        </div>
        <div className="mt-3">
          <p>
            Vous n'avez pas de compte ?{" "}
            <Link href={"/composants/choix/"}>Cliquez ici</Link>
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

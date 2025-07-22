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
  AiOutlinePhone,
  AiOutlineShop,
  AiOutlineHome,
} from "react-icons/ai";

import styles from "./css/InscriptionVendeur.module.css";
import { SaveVendeur } from "@/app/controllers/vendeur/inscriptionVendeur";

function InscriptionVendeur() {
  const [showPassword, setShowPassword] = useState(false);

  const [nom, setnom] = useState<string>("");
  const [mail, setmail] = useState<string>("");
  const [mdp, setmdp1] = useState<string>("");

  const [tel, settel] = useState<string>("");
  const [nomBoutique, setnomBoutique] = useState<string>("");
  const [adresse, setadresse] = useState<string>("");

  const [mess, setmess] = useState<string>("");
  const [load, setload] = useState<boolean>(false);
  const resetForm = (): void => {
    setnom("");
    setmail("");
    setmdp1("");
    settel("");
    setnomBoutique("");
    setadresse("");
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    SaveVendeur(
      e,
      nom,
      mail,
      mdp,
      tel,
      nomBoutique,
      adresse,
      setmess,
      setload,
      resetForm
    );
  };

  return (
    <div className={styles.pageWrapper}>
      <Link href="/" className={styles.closeLink}>
        <AiOutlineClose size={24} />
      </Link>

      <div className={styles.inscriptionBox}>
        <h2>Inscription Vendeur</h2>
        <form onSubmit={handleSubmit}>
          <Champ
            Icon={AiOutlineUser}
            value={nom}
            onChange={setnom}
            placeholder="Nom complet"
          />

          <Champ
            Icon={AiOutlineMail}
            type="email"
            value={mail}
            onChange={setmail}
            placeholder="Email"
          />

          <Champ
            Icon={AiOutlinePhone}
            type="tel"
            value={tel}
            onChange={settel}
            placeholder="Numéro de téléphone"
          />

          <Champ
            Icon={AiOutlineShop}
            value={nomBoutique}
            onChange={setnomBoutique}
            placeholder="Nom de la boutique"
          />

          <Champ
            Icon={AiOutlineHome}
            value={adresse}
            onChange={setadresse}
            placeholder="Adresse de la boutique"
          />

          {/* Mot de passe en pleine largeur */}
          <div
            className="full-width"
            style={{ marginBottom: "1rem", position: "relative" }}
          >
            <AiOutlineLock size={20} style={iconStyle} />
            <input
              value={mdp}
              onChange={(e) => setmdp1(e.target.value)}
              type={showPassword ? "text" : "password"}
              placeholder="Mot de passe"
              required
              style={inputStyle}
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

          {/* Bouton en pleine largeur aussi */}
          <div className="full-width">
            {!load ? (
              <button type="submit" style={btnStyle}>
                S’inscrire
              </button>
            ) : (
              <button type="button" disabled style={btnStyle}>
                <span
                  className="spinner-border spinner-border-sm"
                  aria-hidden="true"
                ></span>
                <span role="status">Inscriptions en cours...</span>
              </button>
            )}
          </div>
        </form>

        <div className="m-2">
          <b style={{ color: "red" }}>{mess}</b>
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

export default InscriptionVendeur;

import { CSSProperties } from "react";

const iconStyle: CSSProperties = {
  position: "absolute",
  top: "50%",
  left: "10px",
  transform: "translateY(-50%)",
  color: "#888",
};

const inputStyle = {
  width: "100%",
  padding: "0.8rem 2.5rem 0.8rem 2.5rem",
  borderRadius: "8px",
  border: "1px solid #ccc",
  outline: "none",
};

const btnStyle = {
  width: "100%",
  padding: "0.8rem",
  backgroundColor: "#ff6f00",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
};

// 🔁 Composant de champ réutilisable
function Champ({
  Icon,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  Icon: any;
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <div style={{ marginBottom: "1rem", position: "relative" }}>
      <Icon size={20} style={iconStyle} />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type={type}
        placeholder={placeholder}
        required
        style={inputStyle}
      />
    </div>
  );
}

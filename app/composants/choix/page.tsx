"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AiOutlineClose } from "react-icons/ai";
import styles from "./css/choix.module.css";

function Choix() {
  return (
    <>
      <div className={styles.pageWrapper}>
        {/* Croix retour accueil */}
        <Link
          href="/"
          className={styles.closeLink}
          aria-label="Annuler et revenir à l'accueil"
        >
          <AiOutlineClose size={24} />
        </Link>

        <div className={styles.choixBox}>
          <h2>Vous êtes </h2>
          <Link
            href={"/composants/inclient"}
            className="btn mt-3"
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
            Client{" "}
          </Link>
          <Link
            href={"/composants/vendeur/ins/"}
            className="btn mt-4"
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
            Vendeur{" "}
          </Link>
          <div className="mt-3">
            <p>
              Vous avez déjà créé un compte ? <br />
              <Link href={"/composants/login"}>Connectez-vous</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Choix;

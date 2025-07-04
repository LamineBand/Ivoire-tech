"use client";
import React, { useState } from "react";
import "./css/nav.css";

import Link from "next/link";
import { ShoppingCart, User, Search } from "lucide-react";
import { Store_Panier } from "@/app/store/panier";

export interface NavbarProps {
  onOpenModal: () => void;
}

function Navbar({ onOpenModal }: NavbarProps) {
  // === État pour afficher ou non le modal ===
  // const [showModal, setShowModal] = useState(false);

  const compteur = Store_Panier((state) => state.nbrPanier);
  return (
    <>
      <nav className="navbar navbar-expand-lg" id="navbar">
        <div className="container-fluid">
          <a
            className="navbar-brand"
            href="#"
            style={{ color: "white", fontWeight: "bold" }}
          >
            Ivoire-Tech
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Accueil
                </a>
              </li>
              <li className="nav-item">
                <Link href={"#"} className="nav-link">
                  Nos produits
                </Link>
              </li>
              <li className="nav-item">
                <Link href={"#"} className="nav-link">
                  A propos de nous
                </Link>
              </li>
              <li className="nav-item">
                <Link href={"#"} className="nav-link">
                  Contactez nous
                </Link>
              </li>
            </ul>

            {/* === Icône Search === */}
            <button
              onClick={onOpenModal}
              className="btn btn-link me-4"
              style={{ color: "white" }}
            >
              <Search size={26} strokeWidth={2.2} />
            </button>

            {/* === Icônes panier et user === */}
            <div className="d-flex">
              <Link
                href={"/composants/panier"}
                type="button"
                className="position-relative me-4"
              >
                <ShoppingCart size={28} color="#fff" strokeWidth={2.2} />
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {/* {nombre} */}
                  {compteur}
                  <span className="visually-hidden">unread messages</span>
                </span>
              </Link>
              <Link
                href={"/composants/login"}
                style={{ color: "white" }}
                className="me-2"
              >
                <User size={28} color="#fff" />
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;

"use client";
import React, { useState } from "react";
import "./css/nav.css";

import Link from "next/link";
import { ShoppingCart, User, Search, FileBox } from "lucide-react";
import { Store_Panier } from "@/app/store/panier";
import { IoBagHandleSharp, IoCall, IoMenuOutline } from "react-icons/io5";
import { IoMdHome } from "react-icons/io";
import { BsBoxSeam } from "react-icons/bs";
import { AiOutlineInfoCircle } from "react-icons/ai";
import useSeachStore from "@/app/store/affiche_Seach";
export interface NavbarProps {
  onOpenModal: () => void;
}

function Navbar({ onOpenModal }: NavbarProps) {
  // === État pour afficher ou non le modal ===
  // const [showModal, setShowModal] = useState(false);

  const compteur = Store_Panier((state) => state.nbrPanier);
  //ouverture de seach bar
  const ouverture = useSeachStore((state) => state.ouvire);

  return (
    <>
      <nav
        className="navbar navbar-expand-lg"
        id="navbar"
        style={{ boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}
      >
        <div className="container-fluid">
          <a
            className="navbar-brand m-0"
            href="#"
            style={{ color: "white", fontWeight: "bold" }}
          >
            Ivoire-Tech
          </a>
          {/**
         * 
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
         */}
          {/* === les icon user panier et seach mobilfirest === */}
          <div className=" ms-auto  d-lg-none  d-flex align-items-center">
            {/* === Icône Search === */}
            <button
              onClick={onOpenModal}
              className="btn btn-link"
              style={{ color: "white" }}
            >
              <Search size={20} strokeWidth={2.2} />
            </button>{" "}
            <Link
              href={"/composants/panier"}
              type="button"
              className="position-relative"
            >
              <ShoppingCart size={20} color="#fff" strokeWidth={2.2} />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {/* {nombre} */}
                {compteur}
                <span className="visually-hidden">unread messages</span>
              </span>
            </Link>
            <Link
              href={"/composants/login"}
              style={{ color: "white" }}
              className="ms-4"
            >
              <User size={20} color="#fff" />
            </Link>
          </div>
          {/**Boutton de menu sur petit ecran */}
          <button
            className="btn d-lg-none m-0"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
          >
            <IoMenuOutline size={27} color="white" />
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link href={"/"} className="nav-link">
                  Accueil
                </Link>
              </li>
              <li className="nav-item">
                <Link href={"/pages/tout_produit/"} className="nav-link">
                  Nos produits
                </Link>
              </li>
              <li className="nav-item">
                <Link href={"/pages/apropos/"} className="nav-link">
                  A propos de nous
                </Link>
              </li>
              <li className="nav-item">
                <Link href={"/pages/contact/"} className="nav-link">
                  Contactez nous
                </Link>
              </li>
            </ul>

            {/* === Icônes panier et user === ouverture  onClick={onOpenModal}*/}
            <div className="d-flex align-items-center">
              <button
                onClick={ouverture}
                className="btn btn-link"
                style={{ color: "white" }}
              >
                <Search size={22} strokeWidth={2.2} />
              </button>{" "}
              <Link
                href={"/composants/panier"}
                type="button"
                className="position-relative me-4"
              >
                <ShoppingCart size={22} color="#fff" strokeWidth={2.2} />
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
                <User size={22} color="#fff" />
              </Link>
            </div>
          </div>
        </div>
      </nav>
      {/* Offcanvas navbar */}
      <div
        className="offcanvas offcanvas-end"
        tabIndex={-1}
        id="offcanvasNavbar"
      >
        <div className="offcanvas-header border-bottom">
          <h5 className="offcanvas-title">Menu</h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul className="navbar-nav mb-4">
            <li className="nav-item m-1">
              <Link href={"/"} className="nav-link">
                <IoMdHome size={25} /> Accueil
              </Link>
            </li>
            <li className="nav-item m-1">
              <Link href={"/pages/tout_produit/"} className="nav-link">
                <IoBagHandleSharp size={25} className=" me-2" />
                Nos produits
              </Link>
            </li>
            <li className="nav-item m-1">
              <Link href={"/pages/apropos/"} className="nav-link">
                <AiOutlineInfoCircle size={25} className=" me-2" /> A propos de
                nous
              </Link>
            </li>
            <li className="nav-item m-1">
              <Link href={"/pages/contact/"} className="nav-link">
                <IoCall size={25} className=" me-2" /> Contactez nous
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;

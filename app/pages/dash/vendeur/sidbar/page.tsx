"use client";
import {
  Boxes,
  ClipboardList,
  Home,
  LayoutDashboard,
  LogOut,
  ShoppingBag,
  UserCircle,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import "./css/dash.css";
import axios from "axios";

function Sidebar() {
  const handleLogout = async () => {
    await axios.post("/api/deconnexion");
    window.location.href = "/";
  };
  return (
    <div className="container">
      <div className="row">
        {/* Sidebar */}
        <aside className="m-0 border-end py-4 d-none d-md-block z-3">
          <ul className="nav flex-column px-2">
            <li className="nav-item" id="li_text-side">
              <Link
                href={"/pages/dashVendeur"}
                id="textsid"
                className=" d-flex align-items-center fw-bold"
              >
                <LayoutDashboard size={25} strokeWidth={1.8} className="me-2" />
                Tableau de bord
              </Link>
            </li>

            <li className="nav-item" id="li_text-side">
              <Link
                href={"/pages/dash/vendeur/produit"}
                id="textsid"
                className="fw-bold"
              >
                <Boxes size={25} strokeWidth={1.8} className="me-2" />
                Mes produits
              </Link>
            </li>

            <li className="nav-item" id="li_text-side">
              <Link
                href={"/pages/dash/vendeur/profil"}
                id="textsid"
                className="fw-bold"
              >
                <UserCircle size={25} className="text-gray-800 me-2" />
                Profil
              </Link>
            </li>

            <li className="nav-item" id="li_text-side">
              <Link href={"#"} id="textsid" className="fw-bold">
                <ClipboardList size={25} className="me-2" strokeWidth={1.8} />
                Commandes
              </Link>
            </li>
            <li className="nav-item" id="li_text-side">
              <Link
                href={"/"}
                id="textsid"
                className=" d-flex align-items-center fw-bold"
              >
                <Home
                  size={25}
                  color="#4A4A4A"
                  strokeWidth={1.8}
                  className="me-2"
                />
                Accueil
              </Link>
            </li>
            <li className="nav-item mt-3">
              <Link
                href={"#"}
                id="textsid"
                className="fw-bold"
                style={{ color: "#ff6f00" }}
                onClick={() => handleLogout()}
              >
                <LogOut size={25} className="me-2" strokeWidth={1.8} />
                Déconnexion
              </Link>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
}

export default Sidebar;

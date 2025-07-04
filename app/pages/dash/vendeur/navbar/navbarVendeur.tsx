"use client";
import React, { useEffect, useState } from "react";

import {
  Boxes,
  ClipboardList,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  UserCircle,
} from "lucide-react";
import Link from "next/link";
import { VendeurType } from "@/type/type";
type NavdashProps = {
  bout?: string;
  // autres props si besoin
};
function Navdash({ bout }: NavdashProps) {
  const [user, setuser] = useState<VendeurType>();

  useEffect(() => {
    const req = JSON.parse(localStorage.getItem("user")!);
    console.log("info dans dash = ");
    setuser(req);
    //console.log(req);
  }, []);
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light  border-bottom shadow-sm fixed-top"
      style={{ backgroundColor: "#ff6f00" }}
    >
      <div className="container-fluid">
        <a className="navbar-brand fw-bold text-white" href="#">
          {user?.nomBoutique}
        </a>
        <div className="d-flex align-items-center">
          {/**  {bout}
               <button className="btn btn-outline-secondary me-3 position-relative">
                
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  3
                </span>
              </button>
           */}
          <div className="dropdown">
            {/**
            <a
              href="#"
              className="d-flex align-items-center text-decoration-none "
            >
            
                 *  <img
                    src="https://i.pravatar.cc/40"
                    className="rounded-circle me-2"
                    width="32"
                    height="32"
                  />
                
              <FaUserCircle size={35} className="text-gray-700 me-2" />
              <span className="m-2">Lamine</span>
            </a>
             */}
            <div className="d-md-none px-3 pt-2">
              <button
                className="btn "
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#mobileSidebar"
                aria-controls="mobileSidebar"
              >
                <Menu
                  size={28}
                  className="text-gray-800 fw-bold"
                  style={{ color: "white" }}
                />
              </button>
            </div>
            {/* Offcanvas Sidebar pour mobile */}
            <div
              className="offcanvas offcanvas-start d-md-none"
              tabIndex={-1}
              id="mobileSidebar"
              aria-labelledby="mobileSidebarLabel"
              style={{ width: "75%", maxWidth: "300px" }}
            >
              <div className="offcanvas-header">
                <h5 id="mobileSidebarLabel">Menu</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <div className="offcanvas-body">
                <aside className=" bg-white border-end   z-3">
                  <ul className="nav flex-column px-2">
                    <li className="nav-item" id="li_text-side">
                      <Link
                        href={"/pages/dashVendeur"}
                        id="textsid"
                        className=" d-flex align-items-center"
                      >
                        <LayoutDashboard
                          size={25}
                          strokeWidth={1.8}
                          className="me-2"
                        />
                        Tableau de bord
                      </Link>
                    </li>

                    <li className="nav-item" id="li_text-side">
                      <Link href={"/pages/dash/vendeur/produit"} id="textsid">
                        <Boxes size={25} strokeWidth={1.8} className="me-2" />
                        Mes produits
                      </Link>
                    </li>

                    {/**
               * <li className="nav-item" id="li_text-side">
               <Link href={"#"} id="textsid">
                <ShoppingBag size={25} strokeWidth={1.8} className="me-2" />
                Ajouter un produit
              </Link>
                 </li>
               */}
                    <li className="nav-item" id="li_text-side">
                      <Link href={"/pages/dash/vendeur/profil"} id="textsid">
                        <UserCircle size={25} className="text-gray-800 me-2" />
                        Profil
                      </Link>
                    </li>
                    <li className="nav-item" id="li_text-side">
                      <Link href={"#"} id="textsid">
                        <ClipboardList
                          size={25}
                          className="me-2"
                          strokeWidth={1.8}
                        />
                        Commandes
                      </Link>
                    </li>
                    <li className="nav-item" id="li_text-side">
                      <Link
                        href={"/"}
                        id="textsid"
                        className=" d-flex align-items-center"
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
                      <Link href={"#"} id="textsid">
                        <LogOut size={25} className="me-2" strokeWidth={1.8} />
                        Déconnexion
                      </Link>
                    </li>
                  </ul>
                </aside>
              </div>
            </div>
            {/**
                *  <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <a className="dropdown-item" href="#">
                      Profil
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item text-danger" href="#">
                      Déconnexion
                    </a>
                  </li>
                </ul>
                */}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navdash;

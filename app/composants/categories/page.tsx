"use client";
import React, { useEffect } from "react";
import "./css/categorie.css";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    label: "Smartphones",
    image: "/categories/smartphone.jpg",
  },
  {
    label: "Ordinateurs",
    image: "/categories/laptop.jpg",
  },
  {
    label: "Accessoires",
    image: "/categories/accessoires.jpg",
  },
  {
    label: "Smartwatch",
    image: "/categories/mtc.jpg",
  },
];

function Categorie_Section() {
  return (
    <div className="container mb-5">
      <h2 className="text-center fw-bold mb-5">
        Découvrez nos catégories technologiques
      </h2>
      <div className="row">
        {categories.map((cat, index) => (
          <Link
            href={"#"}
            className="col-6 col-md-3 col-lg-3 mb-4"
            key={index}
            id="cat"
          >
            <div>
              <div className="card h-100 p-2" id="catShad">
                <img src={cat.image} className="card-img-top" alt={cat.label} />
                <div className="card-body text-center p-2">
                  <h6 className="card-title mb-0">{cat.label}</h6>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center">
            {/* Colonne gauche - deux produits empilés */}
            <div className="col-md-6 d-flex flex-column gap-4">
              {/* Produit 1 */}
              <div
                style={{ backgroundColor: "#f2f2f2" }}
                className="d-flex rounded shadow-sm p-3"
              >
                <img
                  className="mt-auto mb-auto"
                  id="prod"
                  src="/img/sony.png"
                  alt="Produit 1"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "contain",
                    borderRadius: "10px",
                  }}
                />

                <div className="ms-3">
                  <h5 className="mb-1 fw-bold">
                    Son immersif et confort haut de gamme
                  </h5>
                  <p className="mb-0 text-muted">
                    Profitez d’un son immersif avec réduction de bruit active.
                    Confortable, sans fil et idéal pour la musique, les appels
                    et les déplacements.
                  </p>
                </div>
              </div>

              {/* Produit 2 */}
              <div
                style={{ backgroundColor: "#f2f2f2" }}
                className="d-flex rounded shadow-sm p-3"
              >
                <img
                  className="mt-auto mb-auto"
                  id="prod"
                  src="/img/tab.png"
                  alt="Produit 2"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />
                <div className="ms-3">
                  <h5 className="mb-1 fw-bold">
                    Polyvalente, fluide et idéale au quotidien
                  </h5>
                  <p className="mb-0 text-muted">
                    Une tablette performante pour naviguer, regarder des vidéos,
                    travailler ou jouer. Écran HD, grande autonomie et design
                    léger.
                  </p>
                </div>
              </div>

              {/* Produit 3 */}
              <div
                style={{ backgroundColor: "#f2f2f2" }}
                className="d-flex rounded shadow-sm p-3"
              >
                <img
                  className="mt-auto mb-auto"
                  id="prod"
                  src="/img/pav1.png"
                  alt="Produit 2"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "contain",
                    borderRadius: "10px",
                  }}
                />
                <div className="ms-3">
                  <h5 className="mb-1 fw-bold">
                    Puissance et performance pour les gamers exigeants
                  </h5>
                  <p className="mb-0 text-muted">
                    PC portable puissant au design moderne, idéal pour le
                    gaming, le multitâche et la création, avec écran Full HD et
                    carte graphique dédiée.
                  </p>
                </div>
              </div>
            </div>

            {/* Colonne droite - produit vedette */}
            <div className="col-md-6 mt-4 mt-md-0">
              <div
                style={{ backgroundColor: "#f2f2f2" }}
                className="rounded-3 shadow p-4 text-center h-100   d-flex flex-column justify-content-center align-items-center"
              >
                <img
                  src="/img/phoneNV1.png"
                  alt="Produit 3"
                  style={{
                    width: "300px",
                    height: "300px",
                    objectFit: "contain",
                    borderRadius: "15px",
                  }}
                />

                <h3 className="mt-3 fw-bold">
                  L’excellence Apple entre vos mains
                </h3>
                <p className="text-muted">
                  Découvrez l’iPhone, le smartphone emblématique d’Apple.
                  Élégant, fluide et puissant, il offre un écran lumineux, un
                  appareil photo performant et un système iOS sécurisé. Idéal
                  pour un usage quotidien exigeant.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Categorie_Section;

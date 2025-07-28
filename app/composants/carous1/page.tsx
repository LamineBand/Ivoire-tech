"use client";
import React from "react";
import "./css/car.css";

export default function CarousselDefilant() {
  return (
    <div className="ticker-wrapper">
      <div className="ticker">
        <span className="ticker-item">
          Livraison offerte dès 10.000FCFA d’achat – Ne ratez pas cette offre !
        </span>
        <span className="ticker-item">
          Nouveautés chaque semaine – Découvrez les dernières tendances !
        </span>
        <span className="ticker-item">
          Promotions exclusives – Jusqu’à -50% sur une sélection d’articles !
        </span>
        <span className="ticker-item">
          Livraison offerte dès 10.000FCFA d’achat – Ne ratez pas cette offre !
        </span>
        <span className="ticker-item">
          Nouveautés chaque semaine – Découvrez les dernières tendances !
        </span>
        <span className="ticker-item">
          Promotions exclusives – Jusqu’à -50% sur une sélection d’articles !
        </span>
      </div>
    </div>
  );
}

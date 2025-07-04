"use client";
import React, { useEffect } from "react";
import "./css/car.css";

function Carous1() {
  useEffect(() => {
    const carouselEl = document.querySelector("#carouselExampleAutoplaying"); // ou l’ID de ton carousel
    if (carouselEl) {
      const bootstrapCarousel = new window.bootstrap.Carousel(carouselEl, {
        interval: 3000, // temps entre les slides
        ride: "carousel",
      });
    }
  }, []);
  return (
    <div
      id="carouselExampleAutoplaying"
      className="carousel slide "
      data-bs-ride="carousel"
      data-bs-interval="3000"
    >
      <div className="carousel-inner">
        <div className="carousel-item active">
          <center>
            <span>
              Livraison offerte dès 10.000FCFA d’achat – Ne ratez pas cette
              offre !
            </span>
          </center>
        </div>
        <div className="carousel-item">
          <center>
            <span>
              Nouveautés chaque semaine – Découvrez les dernières tendances !
            </span>
          </center>
        </div>
        <div className="carousel-item">
          <center>
            <span>
              Promotions exclusives – Jusqu’à -50% sur une sélection d’articles
              !
            </span>
          </center>
        </div>
      </div>
    </div>
  );
}

export default Carous1;

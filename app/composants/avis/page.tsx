"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/autoplay";
import "./css/avis.css";

const avis = [
  {
    id: 1,
    nom: "Jean-Marc Kouadio",
    img: "https://randomuser.me/api/portraits/men/75.jpg", // homme noir
    message:
      "J'ai acheté un ordinateur portable pour le travail. Super rapide, silencieux, et livré en 48h. Très satisfait !",
    stars: "★★★★★",
  },
  {
    id: 2,
    nom: "Mélissa Yao",
    img: "https://randomuser.me/api/portraits/women/65.jpg", // femme noire
    message:
      "La montre connectée est élégante et fonctionne parfaitement avec mon téléphone. Interface fluide et batterie au top.",
    stars: "★★★★☆",
  },
  {
    id: 3,
    nom: "Ibrahim Sanogo",
    img: "https://randomuser.me/api/portraits/men/66.jpg", // homme noir
    message:
      "Service client réactif. Mon smartphone était bien emballé, et la qualité est vraiment premium.",
    stars: "★★★★★",
  },
  {
    id: 4,
    nom: "Fatimata Coulibaly",
    img: "https://randomuser.me/api/portraits/women/70.jpg", // femme noire
    message:
      "Première commande sur le site. Livraison rapide, bon suivi, et le casque Bluetooth a un excellent son.",
    stars: "★★★★☆",
  },
  {
    id: 5,
    nom: "Serge N’Guessan",
    img: "https://randomuser.me/api/portraits/men/64.jpg", // homme noir
    message:
      "Prix compétitifs et produits de qualité. J’ai commandé un chargeur rapide et il est nickel.",
    stars: "★★★★★",
  },
];

function AvisClient() {
  return (
    <div data-aos="fade-up" data-aos-anchor-placement="center-bottom">
      <div className="container mb-5">
        <h4 className="ms-4">Avis clients</h4>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          loop={true}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {avis.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="testimonial-card">
                <div className="testimonial-header">
                  <img src={item.img} alt={item.nom} className="avatar" />
                  <div className="testimonial-info">
                    <h3>{item.nom}</h3>
                    <div className="stars">{item.stars}</div>
                  </div>
                </div>
                <p className="testimonial-message">“{item.message}”</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default AvisClient;

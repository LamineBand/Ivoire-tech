// app/page.tsx

"use client";

import { useEffect, useState } from "react";
import Carous1 from "./composants/carous1/page";
//import Navbar from "./composants/navbar/page";
import Hero from "./composants/heros/page";
import Categorie_Section from "./composants/categories/page";
//import DisplayProduit from "./composants/afficheproduit/displayProduit";
import AvisClient from "./composants/avis/page";
//import Navbar, { NavbarProps } from "./composants/navbar/page";
import Navbar, { NavbarProps } from "./composants/navbar/navbar";
import DisplayProduit from "./composants/afficheproduit/displayProduit";
import Nos_produit from "./pages/tout_produit/page";
import Footer from "./composants/footer/footer";
import AOS from "aos";
import "aos/dist/aos.css";
export default function Home() {
  // const [nbr, setNbr] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  useEffect(() => {
    AOS.init({
      duration: 2000, // durée de l'animation
      once: true, // animation une seule fois
    });
  }, []);
  return (
    <main style={{ backgroundColor: "#f8f9fa" }}>
      <Carous1 />
      <Navbar {...({ onOpenModal: openModal } as NavbarProps)} />
      <Hero />
      <Categorie_Section />
      <DisplayProduit showModal={showModal} onCloseModal={closeModal} />
      {/**    <DisplayProduit showModal={showModal} onCloseModal={closeModal} /> */}
      <AvisClient />
      <Footer />
    </main>
  );
}

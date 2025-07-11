"use client";
import Carous1 from "@/app/composants/carous1/page";
import Footer from "@/app/composants/footer/footer";
import Navbar, { NavbarProps } from "@/app/composants/navbar/navbar";
import React from "react";

function Contact() {
  const openModal = () => true;
  //const openModal = () => setShowModal(true);
  //const closeModal = () => setShowModal(false);
  return (
    <>
      <Carous1 />
      <Navbar {...({ onOpenModal: openModal } as NavbarProps)} />
      <h1 style={{ marginTop: "5rem" }}>Contact</h1>
      <Footer />
    </>
  );
}

export default Contact;

"use client";
import Carous1 from "@/app/composants/carous1/page";
import Navbar, { NavbarProps } from "@/app/composants/navbar/navbar";
import React from "react";
import { ToastContainer } from "react-toastify";

function DashClient() {
  const openModal = () => true;
  return (
    <>
      <ToastContainer />
      <Carous1 />
      <Navbar {...({ onOpenModal: openModal } as NavbarProps)} />
      <h1>PAge cliente</h1>
    </>
  );
}

export default DashClient;

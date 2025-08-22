"use client";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Store_Panier } from "@/app/store/panier";
import Link from "next/link";
import { IoMdArrowBack } from "react-icons/io";
import { ValiderCommande } from "@/app/controllers/client/checkout";
import { ClientType, CommandeType } from "@/type/produit";

function Checkout() {
  // recupération des produits du panier dans le store
  const StorePanier = Store_Panier((state) => state.Store_P);
  //vider panier
  const viderPanier = Store_Panier((state) => state.vider);
  //création de la variable d'état commande
  const [commande, setCommande] = useState<CommandeType>({
    ref: "",
    date: "",
    userinfo: {
      uid: "",
      nom: "",
      tel: "",
      adresse: "",
      ville: "",
    },
    produits: [],
    total: 0,
    //adresse: "",
    statut: "",
  });
  //les variables d'état
  const [load, setload] = useState(true);
  const [mess, setmess] = useState("");
  const [videur, setvideur] = useState(false);
  const [liv, setliv] = useState(0);
  // recupération des informations du client dans le localstorage
  const [userinfo, setuserinfo] = useState<ClientType>();
  useEffect(() => {
    const info = JSON.parse(localStorage.getItem("user")!);
    setuserinfo(info);
  }, []);
  // calcul de du total avec reduce
  const total = StorePanier.reduce(
    (acc, prod) => acc + prod.prixProduit * prod.qte,
    0
  );
  //test pour vider le panier et mettre livraison a zéro
  useEffect(() => {
    if (videur) {
      console.log("panier doit etre vider");
      viderPanier();
      setliv(0);
    }
  }, [videur]);

  //tester pour mettre prix de livraison
  useEffect(() => {
    if (StorePanier.length === 0) {
      setliv(0);
    } else {
      setliv(2000);
    }
  }, [StorePanier]);
  /**
 *  const [formData, setFormData] = useState({
    email: "",
    Nom: "",
    lastName: "",
    address: "",
    city: "",
    tel: "",
  });

 */

  /**
 * 
 *   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 */

  //cette fonction génère une ref commande
  function genererRefCommande(): string {
    const date = new Date();
    const yyyyMMdd = date.toISOString().slice(0, 10).replace(/-/g, ""); // ex: 20250722
    const random = Math.random().toString(36).substring(2, 8).toUpperCase(); // ex: ABC123
    return `CMD-${yyyyMMdd}-${random}`;
  }
  //soummission de la commande au controlleur
  const handleSubmit = () => {
    if (!userinfo) {
      console.error("userinfo est undefined");
      return;
    }
    const ref = genererRefCommande();
    console.log(ref); // CMD-20250722-XYZ789
    const aujourdHui = new Date();
    const dateFormatee = aujourdHui.toLocaleDateString("fr-FR");
    const nouvelleCommande = {
      ref,
      date: dateFormatee,
      userinfo,
      produits: StorePanier,
      total,
      statut: "en cours",
    };

    setCommande(nouvelleCommande); // ← tu peux l’afficher si besoin
    ValiderCommande(nouvelleCommande, setload, setmess, setvideur); // ← tu envoies la bonne version immédiatement
  };
  useEffect(() => {
    console.log("commande au clic");
    console.log(commande);
    //ValiderCommande(commande);
  }, [commande]);
  return (
    <div
      style={{
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      {/**btn modal succès */}
      <button
        id="suc"
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModalSuccès"
      >
        succès
      </button>
      {/**Modal succès */}
      <div
        className="modal fade"
        id="exampleModalSuccès"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              {/**  <h1 className="modal-title fs-5" id="exampleModalLabel">
                Modal title
              </h1>
                 <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
              */}
            </div>
            <div className="modal-body">
              <center>
                <img
                  src="/img/rsuc.png"
                  style={{ width: "300px", height: "300px", display: "block" }}
                  alt="succès"
                />
                <h4 className="mt-3" style={{ color: "#008000" }}>
                  {" "}
                  Vôtre commande a été valider avec succès
                </h4>
              </center>
            </div>
            <div className="modal-footer">
              {/**<button type="button" className="btn btn-primary">
                Save changes
              </button> */}
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      </div>

      {/**btn echec */}
      <button
        id="echec"
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        echec
      </button>
      {/**Modal echec */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              {/**<h1 className="modal-title fs-5" id="exampleModalLabel">
                Modal title
              </h1>
                <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
              */}
            </div>
            <div className="modal-body">
              <center>
                <img
                  src="/img/echec.jpg"
                  style={{ width: "300px", height: "300px", display: "block" }}
                  alt="echec"
                />
                <h4 className="mt-3" style={{ color: "#FF0000" }}>
                  {" "}
                  Impossible de valider une commande Vide
                </h4>
              </center>
            </div>
            <div className="modal-footer">
              {/** <button type="button" className="btn btn-primary">
                Save changes
              </button> */}
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="text-center mb-4">
          <h1 style={{ color: "#343a40" }}>Ivoire-tech</h1>
          <p style={{ color: "#6c757d" }}>Finaliser votre commande</p>
        </div>

        <div className="row">
          {/* Formulaire retiré */}
          <div className="col-lg-8">
            {/* Contact 
              <div className="card mb-4">
                <div className="card-header">
                  <h5>Contact</h5>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="votre@email.com"
                      required
                    />
                  </div>
                </div>
              </div>
*/}
            {/* Adresse */}
            <div className="card mb-4">
              <div className="card-header">
                <h5>Adresse de livraison</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Nom :</label>
                    <br />
                    <span>
                      <b> {userinfo?.nom}</b>
                    </span>
                    {/**  <input
                        type="text"
                        name="firstName"
                        className="form-control"
                        value={formData.Nom}
                        onChange={handleInputChange}
                        required
                      /> */}
                  </div>
                  {/**
                     *   <div className="col-md-6 mb-3">
                      <label className="form-label">Nom</label>
                      <input
                        type="text"
                        name="lastName"
                        className="form-control"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                     */}
                </div>
                <div className="mb-3">
                  <label className="form-label">Adresse :</label>
                  <br />
                  <span>
                    <b>{userinfo?.adresse}</b>
                  </span>
                  {/**      <input
                      type="text"
                      name="address"
                      className="form-control"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    /> */}
                </div>
                <div className="row">
                  <div className="col-md-8 mb-3">
                    <label className="form-label">Ville :</label>
                    <br />
                    <span>
                      {" "}
                      <b>{userinfo?.ville}</b>
                    </span>
                    {/**
                   *     <input
                        type="text"
                        name="city"
                        className="form-control"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                      />
                      
                   */}
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Numéro de téléphone :</label>
                    <br />
                    <span>
                      <b>{userinfo?.tel}</b>
                    </span>
                    {/**
                 *       <input
                        type="telephone"
                        name="telephone"
                        className="form-control"
                        value={formData.tel}
                        onChange={handleInputChange}
                        required
                      />
                 */}
                  </div>
                </div>
              </div>
            </div>
            {/**bouton de retour a la page d'accueil */}
            <Link
              href="/"
              className="btn"
              style={{
                backgroundColor: "#f8f9fa", // Gris clair Bootstrap par défaut
                color: "#555",
                border: "1px solid #ddd",
                padding: "0.5rem 1rem",
                borderRadius: "0.25rem",
                textDecoration: "none",
              }}
            >
              <IoMdArrowBack /> Continuer mes achats
            </Link>
            {/* Paiement */}
          </div>

          {/* Résumé commande */}
          <div className="col-lg-4">
            <div className="card">
              <div className="card-header">
                <h5>Résumé de commande</h5>
              </div>
              <div className="card-body">
                {/* Produit 1 */}
                {StorePanier.length === 0 ? (
                  <div className="text-center text-muted py-4">
                    <i className="bi bi-cart-x fs-1 mb-2"></i>
                    <p className="mb-0">Votre panier est vide.</p>
                  </div>
                ) : (
                  StorePanier.map((item) => (
                    <div
                      className="d-flex align-items-center mb-3"
                      key={item._id}
                    >
                      <img
                        src={item.imageProduit}
                        alt={item.nomProduit}
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />
                      <div className="ms-3 flex-grow-1">
                        <h6 className="mb-0">{item.nomProduit}</h6>
                        <small className="text-muted">
                          Quantité: {item.qte}
                        </small>
                      </div>
                      <span className="fw-bold">
                        {item.prixProduit * item.qte} FCFA
                      </span>
                    </div>
                  ))
                )}

                <hr />

                {/* Totaux */}
                <div className="d-flex justify-content-between mb-2">
                  <span>Sous-total</span>
                  <span> {total} FCFA</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Livraison</span>
                  <span>{liv} FCFA</span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span>TVA</span>
                  <span> 0 FCFA</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-4">
                  <span className="fw-bold fs-5">Total</span>
                  <span className="fw-bold fs-5 text-primary">
                    {" "}
                    {total + liv} FCFA
                  </span>
                </div>
                {load ? (
                  <button
                    type="submit"
                    className="btn  w-100"
                    style={{
                      padding: "12px",
                      backgroundColor: "#ff6f00",
                      fontWeight: "bold",
                      color: "#fff",
                    }}
                    onClick={() => handleSubmit()}
                  >
                    Valider la commande
                  </button>
                ) : (
                  <button
                    className="btn  w-100"
                    type="button"
                    disabled
                    style={{
                      padding: "12px",
                      backgroundColor: "#ff6f00",
                      fontWeight: "bold",
                      color: "#fff",
                    }}
                  >
                    <span
                      className="spinner-border spinner-border-sm"
                      aria-hidden="true"
                    ></span>
                    <span role="status">
                      {" "}
                      Validation de commande en cours...
                    </span>
                  </button>
                )}

                <p
                  className="text-center  mt-3"
                  style={{ fontSize: "0.9rem", color: "red" }}
                >
                  {mess}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;

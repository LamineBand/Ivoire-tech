"use client";
import React, { useEffect, useState } from "react";
import Navdash from "../navbar/navbarVendeur";
import Sidebar from "../sidbar/page";
import "./css/produit.css";
import { Addproduit } from "@/app/controllers/vendeur/addproduit";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { SuppProd } from "@/app/controllers/vendeur/SuppProd";
import { ModifProduit } from "@/app/controllers/vendeur/modifproduit";
import { FileUploaderRegular } from "@uploadcare/react-uploader/next";
import "@uploadcare/react-uploader/core.css";
import imageCompression from "browser-image-compression";
import { upload } from "@imagekit/next";
//import upload from "imagekit-javascript";

import {
  OutputCollectionState,
  OutputCollectionStatus,
  OutputFileEntry,
  OutputFileStatus,
} from "@uploadcare/react-uploader";
interface Produit {
  _id?: string;
  vendeur_id: string;
  nomProduit: string;
  prixProduit: number;
  categorieProduit: string;
  stockProduit: number;
  descriptionProduit: string;
  imageProduit?: string;
}

function Produit() {
  //  VARIABLES D'ÉTAT POUR LE FORMULAIRE
  const [nomProduit, setNomProduit] = useState("");
  const [stockProduit, setStockProduit] = useState(0);
  const [prixProduit, setPrixProduit] = useState(0);
  const [categorieProduit, setCategorieProduit] = useState("");
  const [descriptionProduit, setDescriptionProduit] = useState("");
  const [imageProduit, setImageProduit] = useState("");
  const [mess, setmess] = useState("");
  const [load, setload] = useState(false);
  const [produits, setProduits] = useState<Produit[]>([]);
  const [tab, settab] = useState<Produit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [identV, setidentV] = useState("");

  const [nouv_nomProduit, setnouv_NomProduit] = useState("");
  const [nouv_stockProduit, setnouv_StockProduit] = useState(0);
  const [nouv_prixProduit, setnouv_PrixProduit] = useState(0);
  const [nouv_categorieProduit, setnouv_CategorieProduit] = useState("");
  const [nouv_descriptionProduit, setnouv_DescriptionProduit] = useState("");
  const [nouv_imageProduit, setnouv_ImageProduit] = useState<File | null>(null);
  const [modifProd, setmodifProd] = useState<Produit>();
  const [loadmodif, setloadmodif] = useState(false);
  const [img, setimg] = useState("");
  //recupération des infos au chargement de la page
  useEffect(() => {
    const fetchProduits = async () => {
      try {
        const res = await axios.get("/api/recupPropVendeur");
        console.log("Produits récupérés :", res.data.data);
        console.log(res.data.data);

        settab(res.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération :", error);
      }
    };

    fetchProduits();
  }, []);
  //recherche id du vendeur pour stocker dans identV pour trié les produits
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")!);
    setidentV(user.uid);
  }, []);
  console.log("ident V =");
  console.log(identV);
  // mettre a jour la viarble produits pour recupere  les produits
  useEffect(() => {
    const tab1 = tab.filter((item) => item.vendeur_id === identV);
    setProduits(tab1);
  }, [tab]);
  useEffect(() => {
    if (modifProd) {
      setnouv_NomProduit(modifProd.nomProduit ?? "");
      setnouv_StockProduit(modifProd.stockProduit ?? 0);
      setnouv_PrixProduit(modifProd.prixProduit ?? 0);
      setnouv_CategorieProduit(modifProd.categorieProduit ?? "");
      setnouv_DescriptionProduit(modifProd.descriptionProduit ?? "");
      // L'image reste null, car c'est le fichier choisi manuellement.
    }
  }, [modifProd]);

  /* const tab1 = tab.filter((item) => item.vendeur_id === identV);
  console.log("tab 1");
  console.log(tab1);*/
  // setProduits(tab1);
  // ✅ Une fonction pour gérer la soumission du formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Vérifie les valeurs ici ou envoie les données à ton API
    const user = JSON.parse(localStorage.getItem("user")!);
    const vendeur_id = user.uid;

    console.log("id vendeur " + vendeur_id);

    Addproduit(
      vendeur_id,
      nomProduit,
      stockProduit,
      prixProduit,
      categorieProduit,
      descriptionProduit,
      imageProduit,
      setmess,
      setload,
      produits,
      setProduits,
      setNomProduit,
      setStockProduit,
      setPrixProduit,
      setCategorieProduit,
      setDescriptionProduit,
      setImageProduit
    );
    /*console.log({
      nomProduit,
      stockProduit,
      prixProduit,
      categorieProduit,
      descriptionProduit,
      imageProduit,
    });*/
  };
  //supprimer produit
  const handleSuppProd = async (
    e: React.FormEvent<HTMLFormElement>,
    id: string
  ) => {
    await SuppProd(e, id, produits, setProduits);
    // Optionnel : recharger la page pour voir les changements
    // window.location.reload();
  };
  {
    /**Recherche du produit a modifier et affecter a la var global modifPtod pour modifier  */
  }
  function rechercheProduit(ident: string) {
    const prod = produits.filter((item) => item._id === ident);
    console.log("produit a modifier =");
    console.log(prod);
    //setmodifProd(prod);
    console.log("produit selectionnée = ");
    console.log(modifProd);
    const obj = prod[0];
    console.log(" obj ======");
    console.log(obj);
    setmodifProd(obj);
  }
  // pour uploader photo uploadCare

  const uploadImage = (
    e: OutputCollectionState<OutputCollectionStatus, "maybe-has-group">
  ) => {
    const url = e?.allEntries[0]?.cdnUrl;
    console.log(url);

    setImageProduit(url || "");
  };

  useEffect(() => {
    console.log("IMG ===");

    console.log(imageProduit);
  }, [imageProduit]);

  {
    /**
     * 
     * 
  //pour image imagekit
  //Upload avec ImageKit
  const [file, setFile] = useState<File | null>(null);
    const handleImageChange = (file: React.ChangeEvent<HTMLInputElement>) => {
    const fileSelected = file?.target?.files![0];
    if (fileSelected) {
      console.log(fileSelected);
      const url = URL.createObjectURL(fileSelected);
      setImageProduit(url);
      setFile(fileSelected);
    }
  };

  //Sauvagarde de l'image dans imagekit
  const sendImage = async () => {
    try {
      //On se connecte avec imageKit
      const response = await fetch("/serveur-api/imagekit-auth");
      const data = await response.json();
      const { signature, expire, token, publicKey } = data;

      if (!file) return alert("Selectionnecter une image valide");
      if (file && file.size > 1024 * 1024 * 2)
        return { message: "Selectionner une image inférireur à 2Mb" };

      // Options de compression
      const options = {
        maxWidthOrHeight: 800,
        useWebWorker: true,
        fileType: "image/webp",
      };

      // Convertir l'image en WebP
      const compressedImage = await imageCompression(file, options);

      //Envoie à imageKit.io
      const uploadResponse = await upload({
        expire,
        token,
        signature,
        publicKey,
        file: compressedImage,
        fileName: `${Date.now()}.webp`,
      });
      console.log("Upload response:", uploadResponse.url);
      setProduits((prev) => ({ ...prev, image: uploadResponse?.url! }));
    } catch (error) {
      console.log(error);
    }
  };
  */
  }

  return (
    <div className="container-fluid">
      <Navdash />
      <ToastContainer />
      <div className="row" style={{ paddingTop: "70px" }}>
        <div
          className="col-md-2"
          style={{
            position: "fixed",
            top: "70px",
            left: 0,
            width: "16.666%",
            height: "calc(100vh - 70px)",
            overflowY: "auto",
            zIndex: 1000,
          }}
        >
          <Sidebar />
        </div>

        <main className="col-md-10 px-4 py-4" id="corps_produit">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0">Mes Produits</h2>
            <button
              type="button"
              className="btn"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              style={{
                backgroundColor: "#ff6f00",
                color: "#fff",
                padding: "0.5rem",
                fontWeight: "bold",
              }}
            >
              Ajouter un produit
            </button>
          </div>

          {/* Grille de produits */}
          <div className="row g-4">
            {produits.length === 0 ? (
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "200px" }}
              >
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Chargement...</span>
                </div>
              </div>
            ) : (
              <div className="row g-4">
                {produits.map((item) => (
                  <div key={item._id!} className="col-md-4">
                    <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
                      {/* Image pleine largeur */}
                      <div
                        className="w-100"
                        style={{ height: "180px", overflow: "hidden" }}
                      >
                        <img
                          src={
                            item.imageProduit ||
                            "https://img.freepik.com/vecteurs-premium/vecteur-icone-image-par-defaut-page-image-manquante-pour-conception-site-web-application-mobile-aucune-photo-disponible_87543-11093.jpg"
                          }
                          alt={item.nomProduit}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            transition: "transform 0.3s",
                          }}
                        />
                      </div>

                      {/* Card Body */}
                      <div className="card-body text-center px-3 py-3">
                        <h5
                          className="card-title fw-bold mb-1 text-truncate"
                          title={item.nomProduit}
                        >
                          {item.nomProduit}
                        </h5>
                        <p className="text-secondary small mb-2">
                          {item.categorieProduit}
                        </p>
                        <p className="fw-bold text-primary fs-5 mb-0">
                          {new Intl.NumberFormat("fr-FR").format(
                            item.prixProduit
                          )}{" "}
                          FCFA
                        </p>
                      </div>

                      {/* Card Footer */}
                      <div className="card-footer bg-white border-0 d-flex justify-content-between px-3 py-3">
                        <button
                          data-bs-toggle="modal"
                          data-bs-target="#modifproduit"
                          className="btn btn-sm btn-outline-primary rounded-pill px-4 fw-semibold"
                          onClick={() => rechercheProduit(item._id!)}
                        >
                          Modifier
                        </button>
                        <form onSubmit={(e) => handleSuppProd(e, item._id!)}>
                          <button
                            type="submit"
                            className="btn btn-sm btn-outline-danger rounded-pill px-4 fw-semibold"
                          >
                            Supprimer
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Formulaire d'ajout de produit */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Ajouter un produit
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <form className="row g-3" onSubmit={handleSubmit}>
                <div className="col-md-6">
                  <label htmlFor="nomProduit" className="form-label">
                    Nom du produit
                  </label>
                  <input
                    type="text"
                    className="form-control shadow-none"
                    id="nomProduit"
                    value={nomProduit}
                    onChange={(e) => setNomProduit(e.target.value)}
                    placeholder="Ex : Ordinateur portable"
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="stockProduit" className="form-label">
                    Stock
                  </label>
                  <input
                    type="number"
                    className="form-control shadow-none"
                    id="stockProduit"
                    value={stockProduit}
                    onChange={(e) => setStockProduit(parseInt(e.target.value))}
                    placeholder="Ex : 20"
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="prixProduit" className="form-label">
                    Prix (CFA)
                  </label>
                  <input
                    type="number"
                    className="form-control shadow-none"
                    id="prixProduit"
                    value={prixProduit}
                    onChange={(e) => setPrixProduit(parseInt(e.target.value))}
                    placeholder="Ex : 15000"
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="categorieProduit" className="form-label">
                    Catégorie
                  </label>
                  <select
                    className="form-select shadow-none"
                    id="categorieProduit"
                    value={categorieProduit}
                    onChange={(e) => setCategorieProduit(e.target.value)}
                  >
                    <option value="">Sélectionner</option>
                    <option value="smartwatch">Smartwatch</option>
                    <option value="smartphone">Smartphone</option>
                    <option value="ordinateurs">Ordinateurs</option>
                    <option value="accessoires">Accessoires</option>
                  </select>
                </div>

                <div className="col-12">
                  <label htmlFor="descriptionProduit" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control shadow-none"
                    id="descriptionProduit"
                    rows={3}
                    value={descriptionProduit}
                    onChange={(e) => setDescriptionProduit(e.target.value)}
                    placeholder="Décrivez votre produit..."
                  ></textarea>
                </div>

                <div className="col-12">
                  <label htmlFor="imageProduit" className="form-label">
                    Image du produit
                  </label>
                  <div className="my-3 p-3 border rounded shadow-sm bg-light">
                    <FileUploaderRegular
                      pubkey="8ed532fcdc0227b44723"
                      onChange={uploadImage}
                      sourceList="local" // ✅ string et non string[]
                      imgOnly // optionnel : n’accepte que des images
                    />

                    {imageProduit ? (
                      <div className="text-center mt-3">
                        <img
                          src={imageProduit}
                          alt="Image du produit"
                          style={{
                            maxWidth: "200px",
                            maxHeight: "200px",
                            objectFit: "cover",
                            borderRadius: "10px",
                            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                          }}
                        />
                      </div>
                    ) : (
                      <p className="text-muted text-center mt-3">
                        Aucune image sélectionnée
                      </p>
                    )}
                  </div>
                </div>
                {load ? (
                  <button
                    className="btn"
                    type="button"
                    disabled
                    style={{
                      backgroundColor: "#ff6f00",
                      color: "#fff",
                      padding: "0.5rem",
                      fontWeight: "bold",
                    }}
                  >
                    <span
                      className="spinner-border spinner-border-sm"
                      aria-hidden="true"
                    ></span>
                    <span role="status"> Ajout de produit en cours ...</span>
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="btn"
                    style={{
                      backgroundColor: "#ff6f00",
                      color: "#fff",
                      padding: "0.5rem",
                      fontWeight: "bold",
                    }}
                  >
                    Ajouter le produit
                  </button>
                )}
                {/**   <a onClick={() => sendImage()}> envoie img</a> */}
              </form>
            </div>

            <div className="modal-footer">
              <span className="me-auto ms-auto text-danger fw-bold fs-6">
                {mess}
              </span>

              {/**<button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Annuler
              </button> */}
            </div>
          </div>
        </div>
      </div>
      {/**Formulaire de modification de produits */}

      <div
        className="modal fade"
        id="modifproduit"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabe">
                Modifier un produit
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <form
                className="row g-3"
                onSubmit={(e) =>
                  ModifProduit(
                    e,
                    identV,
                    modifProd?._id!,
                    nouv_nomProduit,
                    nouv_stockProduit,
                    nouv_prixProduit,
                    nouv_categorieProduit,
                    nouv_descriptionProduit,
                    nouv_imageProduit,
                    setloadmodif,
                    setmodifProd,
                    produits
                  )
                }
              >
                <div className="col-md-6">
                  <label htmlFor="nomProduit" className="form-label">
                    Nom du produit
                  </label>
                  <input
                    type="text"
                    className="form-control shadow-none"
                    id="nomProduit"
                    value={nouv_nomProduit}
                    onChange={(e) => setnouv_NomProduit(e.target.value)}
                    placeholder="Ex : Ordinateur portable"
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="stockProduit" className="form-label">
                    Stock
                  </label>
                  <input
                    type="number"
                    className="form-control shadow-none"
                    id="stockProduit"
                    value={nouv_stockProduit}
                    onChange={(e) =>
                      setnouv_StockProduit(parseInt(e.target.value) || 0)
                    }
                    placeholder="Ex : 20"
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="prixProduit" className="form-label">
                    Prix (CFA)
                  </label>
                  <input
                    type="number"
                    className="form-control shadow-none"
                    id="prixProduit"
                    value={nouv_prixProduit}
                    onChange={(e) =>
                      setnouv_PrixProduit(parseInt(e.target.value) || 0)
                    }
                    placeholder="Ex : 15000"
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="categorieProduit" className="form-label">
                    Catégorie
                  </label>
                  <select
                    className="form-select shadow-none"
                    id="categorieProduit"
                    value={nouv_categorieProduit}
                    onChange={(e) => setnouv_CategorieProduit(e.target.value)}
                  >
                    <option value="">Sélectionner</option>
                    <option value="smartwatch">Smartwatch</option>
                    <option value="smartphone">Smartphone</option>
                    <option value="ordinateurs">Ordinateurs</option>
                    <option value="accessoires">Accessoires</option>
                  </select>
                </div>

                <div className="col-12">
                  <label htmlFor="descriptionProduit" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control shadow-none"
                    id="descriptionProduit"
                    rows={3}
                    value={nouv_descriptionProduit}
                    onChange={(e) => setnouv_DescriptionProduit(e.target.value)}
                    placeholder="Décrivez votre produit..."
                  ></textarea>
                </div>

                <div className="col-12">
                  <label htmlFor="imageProduit" className="form-label">
                    Image du produit
                  </label>
                  <input
                    type="file"
                    className="form-control shadow-none"
                    id="imageProduit"
                    accept="image/*"
                    onChange={(e) =>
                      setnouv_ImageProduit(
                        e.target.files ? e.target.files[0] : null
                      )
                    }
                  />
                </div>

                {loadmodif ? (
                  <button
                    className="btn"
                    type="button"
                    disabled
                    style={{
                      backgroundColor: "#ff6f00",
                      color: "#fff",
                      padding: "0.5rem",
                      fontWeight: "bold",
                    }}
                  >
                    <span
                      className="spinner-border spinner-border-sm"
                      aria-hidden="true"
                    ></span>
                    <span role="status">
                      {" "}
                      Modification de produit en cours ...
                    </span>
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="btn"
                    style={{
                      backgroundColor: "#ff6f00",
                      color: "#fff",
                      padding: "0.5rem",
                      fontWeight: "bold",
                    }}
                  >
                    Modifier le produit
                  </button>
                )}
              </form>
            </div>

            <div className="modal-footer">
              <span className="me-auto ms-auto text-danger fw-bold fs-6">
                {mess}
              </span>

              {/**<button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Annuler
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Produit;

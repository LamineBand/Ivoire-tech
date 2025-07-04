"use client";
import React, { useEffect, useState } from "react";
import Navdash from "../navbar/navbarVendeur";
import Sidebar from "../sidbar/page";
import { VendeurType } from "@/type/type";
import { SendProfil } from "@/app/controllers/vendeur/modifvend";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

function ProfilVendeur() {
  const [user, setUser] = useState<VendeurType>();
  const [test, setTest] = useState(0);
  const [nom, setNom] = useState("");
  const [mail, setMail] = useState("");
  const [mdp, setMdp] = useState("");
  const [tel, setTel] = useState("");
  const [nomBoutique, setNomBoutique] = useState("");
  const [adresse, setAdresse] = useState("");
  const [load, setLoad] = useState(false);
  const [mess, setMess] = useState("");

  useEffect(() => {
    const req = JSON.parse(localStorage.getItem("user")!);
    setUser(req);
    if (req) {
      setNom(req.nom);
      setMail(req.mail);
      setMdp(req.mdp);
      setTel(req.tel);
      setNomBoutique(req.nomBoutique);
      setAdresse(req.adresse);
    }
  }, []);

  useEffect(() => {
    if (test > 0) {
      toast.success("Profil mis à jour avec succès !");
    }
  }, [test]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    /* if (!user?.uid && !user?.uid) {
      toast.error("UID manquant !");
      return;
    } else {
      toast.success("uid trouver");
      return;
    }*/

    const uid = user!.uid; // Choisis ce qui existe dans ton objet

    console.log("UID utilisé :", uid);

    SendProfil(
      uid,
      nom,
      mail,
      mdp,
      tel,
      nomBoutique,
      adresse,
      setLoad,
      setTest,
      setMess
    );
  };

  return (
    <div className="container-fluid">
      <Navdash />
      <ToastContainer />
      <div className="row" style={{ paddingTop: "70px" }}>
        <div className="col-md-2">
          <Sidebar />
        </div>
        <main className="col-md-10 px-4 py-4">
          <h2 className="mb-4">{nom}</h2>
          <div className="container">
            <h3 className="text-center mb-4">Modifier le profil</h3>
            <form
              onSubmit={handleSubmit}
              className="border p-4 rounded shadow-sm bg-white"
            >
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Nom complet</label>
                  <input
                    type="text"
                    className="form-control shadow-none"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control shadow-none"
                    value={mail}
                    onChange={(e) => setMail(e.target.value)}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Téléphone</label>
                  <input
                    type="tel"
                    className="form-control shadow-none"
                    value={tel}
                    onChange={(e) => setTel(e.target.value)}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Nom de la boutique</label>
                  <input
                    type="text"
                    className="form-control shadow-none"
                    value={nomBoutique}
                    onChange={(e) => setNomBoutique(e.target.value)}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Adresse</label>
                  <input
                    type="text"
                    className="form-control shadow-none"
                    value={adresse}
                    onChange={(e) => setAdresse(e.target.value)}
                    required
                  />
                </div>
              </div>

              {load ? (
                <button
                  className="btn w-100 fw-bold mt-3"
                  type="button"
                  disabled
                  style={{ backgroundColor: "#ff6f00", color: "white" }}
                >
                  <span
                    className="spinner-border spinner-border-sm"
                    aria-hidden="true"
                  ></span>
                  <span role="status">modifications en cours...</span>
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn w-100 fw-bold mt-3"
                  style={{ backgroundColor: "#ff6f00", color: "white" }}
                >
                  Enregistrer les modifications
                </button>
              )}
            </form>
            <center>
              <span className="fw-bold fs-4" style={{ color: "red" }}>
                {mess}
              </span>
            </center>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ProfilVendeur;

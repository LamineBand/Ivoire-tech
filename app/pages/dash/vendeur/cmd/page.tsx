"use client";
import React, { useEffect, useState } from "react";
import Navdash from "../navbar/navbarVendeur";

import { VendeurType } from "@/type/type";
import { cmdfiltre, CommandeType, ProduitType1 } from "@/type/produit";
import axios from "axios";
import Sidebar from "../sidbar/page";
import { toast, ToastContainer } from "react-toastify";

function Cmd() {
  const [user, setuser] = useState<VendeurType>();
  const [cmdbrut, setcmdbrut] = useState<CommandeType[]>([]);
  const [cmd, setcmd] = useState<cmdfiltre[]>([]);
  const [selectedCommande, setSelectedCommande] = useState<any>(null);
  const boutique = user?.nomBoutique;
  //fonction de modification au back
  //fonction de modification au back
  async function statut(id: string, newStatut: string, idvendeur: string) {
    try {
      const dataStatut = {
        id,
        newStatut,
        idvendeur,
      };
      const req = await axios.post("/api/statutcmd/", dataStatut);
      if (req && req.data.mess === "ok") {
        console.log("statut modifier au back ");
        const newCmd = cmd.map((commande) => {
          if (commande.ref.toLocaleLowerCase() === id.toLocaleLowerCase()) {
            // mise à jour du statut de tous les produits de cette commande
            const newProduits = commande.produits.map((produit) => ({
              ...produit,
              statut: newStatut,
            }));

            return {
              ...commande,
              statut: newStatut,
              produits: newProduits,
            };
          }
          return commande; // on garde la commande telle quelle
        });

        console.log("modif de statut des cmd ====");
        console.log(newCmd);

        // Si tu as un state avec useState :
        setcmd(newCmd);

        /** console.log("statut changer");
        console.log("Changer statut commande", id, "=>", newStatut);
        const commande = cmd.filter(
          (item) => item.ref.toLocaleLowerCase() === id.toLocaleLowerCase()
        );
        console.log(" modifier le statut");
        console.log(commande);
        commande[0].statut = newStatut;
        console.log("nouveau statut de cmd");
        console.log(commande);
        const tabupdate = cmd.map((item) => {
          if (item.ref.toLocaleLowerCase() === id.toLocaleLowerCase()) {
            return { ...item, statut: newStatut };
          } else {
            return item;
          }
        });
        console.log("tab update");
        console.log(tabupdate);
        setcmd(tabupdate); */
      } else {
        console.log("echec de modification des statut");

        toast.error("Changement de statut échouer");
      }
    } catch (error) {
      console.log("erreur de modif front :");
      console.log(error);
      toast.error("Une erreur est survenu");
      // toast("Une erreur est survenu");
    }
  }

  // fonction pour changer le statut des commandes
  const handleStatutChange = (id: string, newStatut: string) => {
    console.log("Changer statut commande", id, "=>", newStatut);
    const idvendeur = user?.uid!;
    statut(id, newStatut, idvendeur);
    // Création d'une nouvelle liste de commandes mise à jour

    // Si tu dois envoyer au backend :
    // statut(id, newStatut);
  };
  //fonction de recupération des commandes
  async function getcmd() {
    try {
      const req = await axios.get("/api/recupcmd/");
      if (req && req.data) {
        console.log("les cmd  =");
        console.log(req.data);
        setcmdbrut(req.data.cmd);
      }
    } catch (error) {
      console.log("erreur de récupération des commandes ");
      console.log(error);
    }
  }
  //recupération des infos du vendeur dans localstorage et déclanchement de la fonction de recupération des commandes au  back
  useEffect(() => {
    const req = JSON.parse(localStorage.getItem("user")!) || [];
    console.log("info dans dash = ");
    setuser(req);
    console.log(req);
    getcmd();
  }, []);
  //fonction de trie de commande selon le vendeur au chargement des commandes
  function trie() {
    // let filtre: CommandeType[] = [];
    // let sansdoublon: CommandeType[] = [];
    let tab: ProduitType1[] = [];
    // let tab2: ProduitType1[] = [];
    let cmdfiltre: cmdfiltre[] = [];
    let filtre2: cmdfiltre[] = [];
    let clientInfo = null;
    for (let index = 0; index < cmdbrut.length; index++) {
      clientInfo = cmdbrut[index].userinfo;
      tab = cmdbrut[index].produits.filter(
        (item) =>
          item.vendeur_id.toLocaleLowerCase() === user?.uid.toLocaleLowerCase()
      );
      {
        /**  console.log("les info du client qui passe la cmd ====");
            console.log(clientInfo);
            console.log("filtre des produit du vendeur==== ");
            console.log(tab); */
      }

      cmdfiltre.push({
        ref: cmdbrut[index].ref,
        clientInfo,
        produits: tab,
        date: cmdbrut[index].date,
        statut: cmdbrut[index].statut,
      });
    }
    filtre2 = cmdfiltre.filter((item) => item.produits.length > 0);
    setcmd(filtre2);
    {
      /**
           if (Array.isArray(cmdbrut)) {
            for (let index = 0; index < cmdbrut.length; index++) {
              for (let i = 0; i < cmdbrut[index].produits.length; i++) {
                if (cmdbrut[index].produits[i].vendeur_id === user?.uid) {
                  filtre.push(cmdbrut[index]);
                }
              }
            }
            console.log("commandes concernant ce vendeur :", filtre);
          } else {
            //  console.log("cmdbrut n'est pas un tableau :", cmdbrut);
          }
          */
    }
    // filtré sans doublons je parcours une cmd je prend les infos du client ensuite je filtre les produits qui lui appartiennent
    // et je fais un nouveau tableau de commande qui prend chaque info du client et ses cmd concercenant ce vendeur un peu
    //comme pour Mr hier la
  }
  // déclanchement de fonction de trie une fois les cmd charger de la db et les infos vendeur
  useEffect(() => {
    console.log("toutes les commandes ======");

    console.log(cmdbrut);
    trie();
  }, [cmdbrut, user]);
  return (
    <>
      <div className="container-fluid">
        <ToastContainer />
        {/* Header */}
        <Navdash bout={boutique} />
        {/* Page layout */}
        <div className="row" style={{ paddingTop: "70px" }}>
          {/* Sidebar */}
          <div className="col-md-2">
            <Sidebar />
          </div>
          {/* Contenu principal */}
          <main className="col-md-10 px-4 py-4">
            {" "}
            <h1 className="mb-4">commandes</h1>
            {/* Tableau des commandes */}
            <div className="card shadow-sm">
              <div className="card-header bg-white fw-bold">
                Toutes les commandes reçu
              </div>
              <div className="card-body table-responsive">
                <table className="table table-striped align-middle">
                  <thead>
                    <tr>
                      <th>Client</th>
                      <th>Produit</th>
                      <th>Total</th>
                      <th>Date</th>
                      <th>Statut</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cmd.length > 0 ? (
                      cmd.map((item) => (
                        <tr key={item.ref}>
                          <td>{item.clientInfo.nom}</td>
                          <td>{item.produits[0].nomProduit}</td>
                          <td>
                            {new Intl.NumberFormat("fr-FR").format(
                              item.produits.reduce(
                                (total, p) => total + p.prixProduit * p.qte,
                                0
                              )
                            )}{" "}
                            CFA
                          </td>
                          <td>{item.date}</td>
                          <td>
                            <select
                              className="form-select form-select-sm fw-semibold shadow-sm"
                              value={item.produits[0].statut}
                              onChange={(e) =>
                                handleStatutChange(item.ref, e.target.value)
                              }
                              style={{
                                minWidth: "140px",
                                borderRadius: "8px",
                                borderColor: "#ddd",
                              }}
                            >
                              <option value="En attente">En attente</option>
                              <option value="En cours">En cours</option>
                              <option value="Livré">Livré</option>
                              <option value="Annulé">Annulé</option>
                            </select>
                          </td>
                          <td>
                            <button
                              className="btn btn-sm btn-outline-primary"
                              onClick={() => setSelectedCommande(item)}
                            >
                              Voir détails
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="text-center text-secondary">
                          Aucune commande reçue
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            {/* Modal détails commande */}
            {selectedCommande && (
              <div
                className="modal show fade d-block"
                tabIndex={-1}
                style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
              >
                <div className="modal-dialog modal-lg modal-dialog-centered">
                  <div className="modal-content border-0 shadow-lg rounded-3">
                    {/* Header */}
                    <div className="modal-header bg-light border-0">
                      <h5 className="modal-title fw-bold text-dark">
                        Détails de la commande #{selectedCommande.ref}
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={() => setSelectedCommande(null)}
                      ></button>
                    </div>

                    {/* Body */}
                    <div className="modal-body">
                      <div className="mb-3">
                        <p className="mb-1">
                          <strong>Client :</strong>{" "}
                          <span className="text-secondary">
                            {selectedCommande.clientInfo.nom}
                          </span>
                        </p>
                        <p className="mb-3">
                          <strong>Date :</strong>{" "}
                          <span className="text-secondary">
                            {selectedCommande.date}
                          </span>
                        </p>
                      </div>

                      <div className="mb-3">
                        <p className="fw-semibold mb-2">Produits :</p>
                        <ul className="list-group list-group-flush">
                          {selectedCommande.produits.map(
                            (p: any, i: number) => (
                              <li
                                key={i}
                                className="list-group-item d-flex justify-content-between align-items-center px-0 py-2 border-bottom"
                              >
                                <span>
                                  {p.nomProduit} ({p.qte})
                                </span>
                                <span className="fw-semibold">
                                  {new Intl.NumberFormat("fr-FR").format(
                                    p.prixProduit
                                  )}{" "}
                                  CFA
                                </span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>

                      <div className="mb-3 d-flex justify-content-between">
                        <span className="fw-bold fs-5">Total :</span>
                        <span className="fw-bold fs-5 text-success">
                          {new Intl.NumberFormat("fr-FR").format(
                            selectedCommande.produits.reduce(
                              (total: number, p: any) =>
                                total + p.prixProduit * p.qte,
                              0
                            )
                          )}{" "}
                          CFA
                        </span>
                      </div>

                      <div className="mb-3">
                        <p className="fw-semibold">
                          Statut :{" "}
                          <span className="badge bg-primary">
                            {selectedCommande.statut}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}

export default Cmd;

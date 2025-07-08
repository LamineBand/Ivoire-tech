"use client";
import React from "react";
//import Carous1 from "../components/Carous1";
//import Navbar, { NavbarProps } from "../components/Navbar";
import { Users, Target, Award, Heart, Zap, Shield } from "lucide-react";
import Carous1 from "@/app/composants/carous1/page";
import Navbar, { NavbarProps } from "@/app/composants/navbar/navbar";
import "./css/app.css";
import Link from "next/link";
function Apropos() {
  const openModal = () => true;

  return (
    <>
      <Carous1 />
      <Navbar {...({ onOpenModal: openModal } as NavbarProps)} />

      <div
        style={{
          marginTop: "5rem",
          minHeight: "100vh",
          backgroundColor: "#f8fafc",
        }}
      >
        {/* section Heros */}
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "4rem 2rem",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontWeight: "800",
              color: "#1a202c",
              marginBottom: "1.5rem",
              letterSpacing: "-0.025em",
            }}
          >
            À propos de nous
          </h1>

          <div
            style={{
              width: "100px",
              height: "4px",
              backgroundColor: "#4f46e5",
              margin: "0 auto 2rem auto",
              borderRadius: "2px",
            }}
          ></div>

          <p
            style={{
              fontSize: "1.25rem",
              color: "#64748b",
              maxWidth: "800px",
              margin: "0 auto",
              lineHeight: "1.8",
            }}
          >
            Ivoire-Tech, on vit et respire la tech ! PC dernier cri, smartphones
            tendance, accessoires high-tech… On sélectionne pour vous le
            meilleur du numérique à prix juste. Notre équipe est là pour vous
            conseiller et vous accompagner à chaque étape. Ivoire-Tech, c’est
            bien plus qu’un e-commerce : c’est votre univers digital !
          </p>
        </div>

        {/* debuts des sections  */}
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "4rem 2rem",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "3rem",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  backgroundColor: "#eff6ff",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.5rem auto",
                }}
              >
                <Users size={40} color="#4f46e5" />
              </div>
              <h3
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "700",
                  color: "#1a202c",
                  margin: "0 0 0.5rem 0",
                }}
              >
                10,000+
              </h3>
              <p
                style={{
                  color: "#64748b",
                  fontSize: "1.1rem",
                  margin: 0,
                }}
              >
                Clients satisfaits
              </p>
            </div>

            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  backgroundColor: "#f0fdf4",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.5rem auto",
                }}
              >
                <Award size={40} color="#22c55e" />
              </div>
              <h3
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "700",
                  color: "#1a202c",
                  margin: "0 0 0.5rem 0",
                }}
              >
                5+
              </h3>
              <p
                style={{
                  color: "#64748b",
                  fontSize: "1.1rem",
                  margin: 0,
                }}
              >
                Années d'expérience
              </p>
            </div>

            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  backgroundColor: "#fef3c7",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.5rem auto",
                }}
              >
                <Target size={40} color="#f59e0b" />
              </div>
              <h3
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "700",
                  color: "#1a202c",
                  margin: "0 0 0.5rem 0",
                }}
              >
                1,000+
              </h3>
              <p
                style={{
                  color: "#64748b",
                  fontSize: "1.1rem",
                  margin: 0,
                }}
              >
                Produits disponibles
              </p>
            </div>

            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  backgroundColor: "#fce7f3",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.5rem auto",
                }}
              >
                <Heart size={40} color="#ec4899" />
              </div>
              <h3
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "700",
                  color: "#1a202c",
                  margin: "0 0 0.5rem 0",
                }}
              >
                99%
              </h3>
              <p
                style={{
                  color: "#64748b",
                  fontSize: "1.1rem",
                  margin: 0,
                }}
              >
                Taux de satisfaction
              </p>
            </div>
          </div>
        </div>

        {/* Mission & Vision Section */}
        <div
          className=" container-fluid p-4"
          style={{
            maxWidth: "1200px",
          }}
        >
          <div className="row  justify-content-center">
            <div
              className="col-lg-4 col-md-5 mt-5 me-lg-5"
              style={{
                backgroundColor: "#ffffff",
                padding: "3rem",
                borderRadius: "20px",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                border: "1px solid #e2e8f0",
              }}
            >
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  backgroundColor: "#eff6ff",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "2rem",
                }}
              >
                <Target size={30} color="#4f46e5" />
              </div>
              <h3
                style={{
                  fontSize: "1.75rem",
                  fontWeight: "700",
                  color: "#1a202c",
                  marginBottom: "1.5rem",
                }}
              >
                Notre Mission
              </h3>
              <p
                style={{
                  color: "#64748b",
                  lineHeight: "1.7",
                  fontSize: "1.1rem",
                  margin: 0,
                }}
              >
                Démocratiser l'accès à la technologie en proposant des produits
                de qualité à des prix compétitifs, tout en offrant un service
                client exceptionnel et des conseils personnalisés pour chaque
                client.
              </p>
            </div>

            <div
              className="col-lg-4 col-md-5  mt-5 ms-lg-5"
              style={{
                backgroundColor: "#ffffff",
                padding: "3rem",
                borderRadius: "20px",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                border: "1px solid #e2e8f0",
              }}
            >
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  backgroundColor: "#f0fdf4",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "2rem",
                }}
              >
                <Zap size={30} color="#22c55e" />
              </div>
              <h3
                style={{
                  fontSize: "1.75rem",
                  fontWeight: "700",
                  color: "#1a202c",
                  marginBottom: "1.5rem",
                }}
              >
                Notre Vision
              </h3>
              <p
                style={{
                  color: "#64748b",
                  lineHeight: "1.7",
                  fontSize: "1.1rem",
                  margin: 0,
                }}
              >
                Devenir la référence en matière de vente de produits
                technologiques, en créant une communauté de passionnés et en
                contribuant à l'innovation technologique accessible à tous.
              </p>
            </div>
          </div>
        </div>

        {/* Nos valeurs */}
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "4rem 2rem",
            marginTop: "2rem",
          }}
        >
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              textAlign: "center",
              marginBottom: "3rem",
            }}
          >
            <h2
              style={{
                fontSize: "2.5rem",
                fontWeight: "700",
                color: "#1a202c",
                marginBottom: "1rem",
              }}
            >
              Nos Valeurs
            </h2>
            <div
              style={{
                width: "80px",
                height: "4px",
                backgroundColor: "#4f46e5",
                margin: "0 auto",
                borderRadius: "2px",
              }}
            ></div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "2rem",
              maxWidth: "1200px",
              margin: "0 auto",
            }}
          >
            <div
              style={{
                textAlign: "center",
                padding: "2rem",
                borderRadius: "16px",
                backgroundColor: "#f8fafc",
                border: "1px solid #e2e8f0",
              }}
            >
              <div
                style={{
                  width: "70px",
                  height: "70px",
                  backgroundColor: "#eff6ff",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.5rem auto",
                }}
              >
                <Shield size={35} color="#4f46e5" />
              </div>
              <h4
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  color: "#1a202c",
                  marginBottom: "1rem",
                }}
              >
                Confiance
              </h4>
              <p
                style={{
                  color: "#64748b",
                  lineHeight: "1.6",
                  margin: 0,
                }}
              >
                Nous construisons des relations durables basées sur la
                transparence et l'honnêteté.
              </p>
            </div>

            <div
              style={{
                textAlign: "center",
                padding: "2rem",
                borderRadius: "16px",
                backgroundColor: "#f8fafc",
                border: "1px solid #e2e8f0",
              }}
            >
              <div
                style={{
                  width: "70px",
                  height: "70px",
                  backgroundColor: "#f0fdf4",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.5rem auto",
                }}
              >
                <Award size={35} color="#22c55e" />
              </div>
              <h4
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  color: "#1a202c",
                  marginBottom: "1rem",
                }}
              >
                Excellence
              </h4>
              <p
                style={{
                  color: "#64748b",
                  lineHeight: "1.6",
                  margin: 0,
                }}
              >
                Nous nous efforçons d'offrir la meilleure qualité dans tous nos
                produits et services.
              </p>
            </div>

            <div
              style={{
                textAlign: "center",
                padding: "2rem",
                borderRadius: "16px",
                backgroundColor: "#f8fafc",
                border: "1px solid #e2e8f0",
              }}
            >
              <div
                style={{
                  width: "70px",
                  height: "70px",
                  backgroundColor: "#fce7f3",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.5rem auto",
                }}
              >
                <Heart size={35} color="#ec4899" />
              </div>
              <h4
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  color: "#1a202c",
                  marginBottom: "1rem",
                }}
              >
                Passion
              </h4>
              <p
                style={{
                  color: "#64748b",
                  lineHeight: "1.6",
                  margin: 0,
                }}
              >
                Notre amour pour la technologie nous pousse à toujours innover
                et nous améliorer.
              </p>
            </div>
          </div>
        </div>

        {/* Contact liens contact  */}
        <div
          style={{
            backgroundColor: "#0a4580",
            padding: "4rem 2rem",
            textAlign: "center",
            color: "white",
          }}
        >
          <div
            style={{
              maxWidth: "800px",
              margin: "0 auto",
            }}
          >
            <h3
              style={{
                fontWeight: "700",
                marginBottom: "1.5rem",
                margin: "0 0 1.5rem 0",
              }}
            >
              Prêt à découvrir nos produits ?
            </h3>
            <p
              style={{
                fontSize: "1.25rem",
                marginBottom: "2.5rem",
                opacity: "0.9",
                lineHeight: "1.6",
                margin: "0 0 2.5rem 0",
              }}
            >
              Explorez, choisissez, connectez-vous : la technologie qui vous
              correspond est ici.
            </p>
            <Link
              style={{
                textDecoration: "none",
              }}
              href={"/pages/tout_produit/"}
              id="btn_apropos"
            >
              Explorer toute notre boutique 
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Apropos;

"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import Typewriter from "typewriter-effect";
import "./css/heros.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Add this to inform TypeScript about window.bootstrap
declare global {
  interface Window {
    bootstrap: any;
  }
}

function Hero() {
  useEffect(() => {
    const carouselEl = document.querySelector("#carouselExampleInterval"); // ou l’ID de ton carousel
    if (carouselEl) {
      const bootstrapCarousel = new window.bootstrap.Carousel(carouselEl, {
        interval: 3000, // temps entre les slides
        ride: "carousel",
      });
    }
  }, []);
  return (
    <div className="container" id="container_General">
      <div className="row align-items-center" id="container_heros">
        <div className="col-lg-6 mb-4">
          <div
            className="p-4 rounded-5"
            style={{
              backgroundColor: "#ff6f00",
              color: "#ffffff",
            }}
          >
            <center>
              <div id="textHeros" className="text-center m-0">
                <span
                  id="text1"
                  className="fw-bold"
                  style={{
                    fontFamily: "Montserrat",
                    fontWeight: "700",
                  }}
                >
                  <Typewriter
                    options={{
                      strings: ["Bienvenue sur Ivoire-Tech"],
                      autoStart: true,
                      loop: true,
                    }}
                  />
                </span>

                <h4
                  className="mb-3"
                  style={{
                    fontFamily: "Raleway ",
                    fontWeight: "500",
                  }}
                >
                  Les dernières technologies à portée de main.
                </h4>

                <p
                  style={{
                    /**  color: "#2c2c2c", */
                    color: "#fff",
                    fontSize: "1rem",
                    fontFamily: "Open Sans",
                    fontWeight: "400",
                  }}
                >
                  Smartphones, accessoires, ordinateurs & plus — aux meilleurs
                  prix en Côte d’Ivoire.
                </p>
              </div>
            </center>
          </div>
        </div>

        <div
          className=" col-lg-6 d-flex justify-content-center align-items-center"
          id="div_img"
        >
          <div
            id="carouselExampleInterval"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner ">
              <div className="carousel-item active" data-bs-interval="1500">
                <img
                  id="img_Car"
                  src="/img/r4.png"
                  className="d-block w-100"
                  alt=""
                />
              </div>
              <div className="carousel-item" data-bs-interval="1500">
                <img
                  id="img_Car"
                  src="/img/r3.png"
                  className="d-block w-100"
                  alt="..."
                />
              </div>
              <div className="carousel-item" data-bs-interval="1500">
                <img
                  id="img_Car"
                  src="/img/r2.png"
                  className="d-block w-100"
                  alt="..."
                />
              </div>
              <div className="carousel-item" data-bs-interval="1500">
                <img
                  id="img_Car"
                  src="/img/r1.png"
                  className="d-block w-100"
                  alt="..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;

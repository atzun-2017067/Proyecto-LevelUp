import React, { useState, useEffect, useRef } from 'react';
import './CarouselCourses.css';

import slide_image_7 from '../../components/CarouselImages/img/ht.jpg';
import slide_image_6 from '../../assets/img/LevelUp.png'
import slide_image_5 from '../../components/CarouselImages/img/image1.png';

export const CarouselCourses = () => {
  const wrapperRef = useRef(null);
  const carouselRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(null);
  const [startScrollLeft, setStartScrollLeft] = useState(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const carousel = carouselRef.current;
    const firstCardWidth = carousel.querySelector(".card").offsetWidth;

    const arrowBtns = wrapper.querySelectorAll("i");
    const carouselChildrens = [...carousel.children];

    let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

    carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
      carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
    });

    carouselChildrens.slice(0, cardPerView).forEach(card => {
      carousel.insertAdjacentHTML("beforeend", card.outerHTML);
    });

    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");

    arrowBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        if (!btn.hasAttribute("disabled")) {
          btn.setAttribute("disabled", true);
          console.log("Botón de navegación clicado");
          carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
          setTimeout(() => {
            btn.removeAttribute("disabled");
          }, 100);
        }
      });
    });

    const dragStart = (e) => {
      setIsDragging(true);
      carousel.classList.add("dragging");
      setStartX(e.pageX);
      setStartScrollLeft(carousel.scrollLeft);
    };

    const dragging = (e) => {
      if (!isDragging) return;
      carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
    };

    const dragStop = () => {
      setIsDragging(false);
      carousel.classList.remove("dragging");
    };

    const infiniteScroll = () => {
      if (carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
      } else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
      }
    };

    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);
    carousel.addEventListener("scroll", infiniteScroll);

    return () => {
      // Limpia cualquier recurso o temporizador cuando el componente se desmonta
      arrowBtns.forEach(btn => {
        btn.removeEventListener("click", () => {
          // Asegúrate de quitar el manejador de eventos correctamente
          btn.removeAttribute("disabled");
        });
      });
      carousel.removeEventListener("mousedown", dragStart);
      carousel.removeEventListener("mousemove", dragging);
      document.removeEventListener("mouseup", dragStop);
      carousel.removeEventListener("scroll", infiniteScroll);
    };
  }, []);

  return (
    <>
      <div className="wrapper" ref={wrapperRef}>
        <i className="bi bi-arrow-left fs-1" id='left'></i>
        <ul className="carousel" ref={carouselRef}>
          <div className="card">
            <img src={slide_image_7} alt="" />
            <div class="description">
              <p>Descripción de la tarjeta. Puedes agregar aquí información adicional sobre la tarjeta. Descripción de la tarjeta. Puedes agregar aquí información adicional sobre la tarjeta Descripción de la tarjeta. Puedes agregar aquí información.</p>
            </div>
            <div className="buttons">
              <button class="button">
                <span class="button-content">Cotizar</span>
              </button>
              <button class="button">
                <span class="button-content"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart2" viewBox="0 0 16 16">
                  <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                </svg></span>
              </button>


            </div>
          </div>
          <div className="card">
            <img src={slide_image_6} alt="" />
            <div class="description">
              <p>Descripción de la tarjeta. Puedes agregar aquí información adicional sobre la tarjeta. Descripción de la tarjeta. Puedes agregar aquí información adicional sobre la tarjeta Descripción de la tarjeta. Puedes agregar aquí información.</p>
            </div>
            <div className="buttons">
              <button class="button">
                <span class="button-content">Cotizar</span>
              </button>
              <button class="button">
                <span class="button-content"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart2" viewBox="0 0 16 16">
                  <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                </svg></span>
              </button>
            </div>
          </div>

          <div className="card">
            <img src={slide_image_5} alt="" />
            <div class="description">
              <p>Descripción de la tarjeta. Puedes agregar aquí información adicional sobre la tarjeta. Descripción de la tarjeta. Puedes agregar aquí información adicional sobre la tarjeta Descripción de la tarjeta. Puedes agregar aquí información.</p>
            </div>
            <div className="buttons">
              <button class="button">
                <span class="button-content">Cotizar</span>
              </button>
              <button class="button">
                <span class="button-content"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart2" viewBox="0 0 16 16">
                  <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                </svg></span>
              </button>
            </div>
          </div>
        </ul>
        <i className="bi bi-arrow-right fs-1" id="right"></i>
      </div>
    </>
  );
};

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import axios from 'axios'; // Agrega esta línea para importar axios

// Importa los estilos de Swiper
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';

import { EffectCoverflow, Navigation } from 'swiper';
import './Carousel.css';

const Carousel = () => {
  const [cursos, setCursos] = useState([]);  // Estado para almacenar los cursos desde la API

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/cursos/mostrar')
      .then((response) => {
        setCursos(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener cursos:', error);
      });
  }, []);

  // ... Resto del código


  return (
    <div className="con">
      <Swiper
        style={{ height: '44vh' }}
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
          clickable: true,
        }}
        modules={[EffectCoverflow, Navigation]}
        className="swiper_con"
        autoplay={{
          delay: 2000,  // Milisegundos entre cada transición
          disableOnInteraction: false,  // No detener la reproducción automática al interactuar con el carrusel
        }}
      >
        {cursos.map((curso, index) => (
          <SwiperSlide key={index}>
          <img
              src={`data:image/png;base64, ${curso.imagenPortada}`}
              alt={`Imagen de ${curso.nombreCurso}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="slider-controler">
        <div className="swiper-button-prev slider-arrow">
          <i className="bi bi-arrow-left fs-1" id='left'></i>
        </div>
        <div className="swiper-button-next slider-arrow">
          <i className="bi bi-arrow-right fs-1" id="right"></i>
        </div>
        <div className="swiper-pagination"></div>
      </div>
    </div>
  );
};

export default Carousel;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './CarouselCourses.css';
import imga from '../../assets/img/re.jpg'

export const CarouselCourses = () => {
  const [cursos, setCursos] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const cardsPerPage = 4; // Número de tarjetas por página




  useEffect(() => {
    // Realizar la solicitud para obtener los datos de la API
    axios.get('http://localhost:3000/api/cursos/mostrar')
      .then(response => {
        // Actualizar el estado con los datos obtenidos
        setCursos(response.data);
      })
      .catch(error => {
        console.error('Error al obtener cursos:', error);
      });
  }, []);


  // Función para ir a la página anterior
  const prevPage = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - cardsPerPage);
    }
  };

  // Función para ir a la página siguiente
  const nextPage = () => {
    if (startIndex + cardsPerPage < cursos.length) {
      setStartIndex(startIndex + cardsPerPage);
    }
  };

  return (
    <>
      <div className="carousel-container" >
      <i className="bi bi-arrow-left-circle-fill" onClick={prevPage} id='izquierda'></i>
        <div className="carousel">
          {cursos.slice(startIndex, startIndex + cardsPerPage).map(curso => (
            <div key={curso.id} className="card">
<img
              src={`data:image/png;base64, ${curso.imagenPortada}`}
              alt={`Imagen de ${curso.nombreCurso}`}
            />
<h1>{curso.nombreCurso}</h1>
              <div class="description">
<p>{curso.descripcion}</p>
              </div>
              <div className="buttons">
              <Link to={`/course/${curso.id}`}>
                  <button class="button">
                  <span class="button-content">Cotizar</span>
                </button>
                </Link >
                <Link to={'cart'}>
                  <button class="button">
                    <span class="button-content"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart2" viewBox="0 0 16 16">
                      <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                    </svg></span>
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>




        <i className="bi bi-arrow-right-circle-fill " id='derecha'  onClick={nextPage} ></i>

      </div>
    </>
  );
};

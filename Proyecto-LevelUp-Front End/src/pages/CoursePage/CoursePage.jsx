import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './CoursePage.css';
import { Navbar } from '../../components/Navbar/Navbar';
import { CarouselCourses } from '../../components/CarouselCourses/CarouselCourses';
import ImageLogo from '../../assets/img/LevelUp-Icono.png';
import Image from '../../assets/img/re.jpg';

export const CoursePage = () => {
  const { id } = useParams();
  const [curso, setCurso] = useState(null);

  // Aquí unificamos los efectos para evitar el error de "Rendered more hooks"
  useEffect(() => {
    // Realizar la solicitud para obtener los datos de la API
    axios.get(`http://localhost:3000/api/cursos/mostrarId/${id}`)
      .then(response => {
        // Actualizar el estado con los datos obtenidos
        setCurso(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error al obtener cursos:', error);
      });
  }, [id]);

  // Verificar si curso tiene datos antes de acceder a sus propiedades
  if (!curso) {
    return <div>Cargando...</div>; // Muestra un mensaje de carga mientras se obtienen los datos
  }

  const url = 'https://levelup.gt/form';
  const abrirURL = () => {
    window.location.href = url;
  };

  // Parseamos el pensum una sola vez
  const parsedPensum = curso.pensum ? JSON.parse(curso.pensum.replace(/\\\\"/g, '')) : [];

  return (
    <>
      <Navbar></Navbar>
      <div className='s'>
        <div className='info'>
          <h1>{curso.nombreCurso}</h1>
          <p className='p'>{curso.descripcion}</p>
          <div className="cont">
            <div className="subcon">
              <h3 className="subs">Modalidad</h3>
              <p className="mod">{curso.modalidad}</p>
            </div>
            <div className="subcon">
              <h3 className="subs">Especialidad</h3>
              <p className="mod">{curso.especialidad}</p>
            </div>
          </div>
          <div className="fraseimag">
            <h1 className="frase">Con nosotros llegarás al siguiente nivel</h1>
            <img src={ImageLogo} alt="" />
          </div>
        </div>
        <div id="divFijo">
          <img src={`data:image/png;base64, ${curso.imagenPortada}`} alt="" />
          <button className="butCot">
            <div className="text" onClick={abrirURL}>
              Cotizar
            </div>
          </button>
          <Link to={'/cart'}>
            <button className="butCar">
              <div className="text">
                Añadir al Carrito
              </div>
            </button>
          </Link>
          <h3>Duración</h3>
          <p className='duracion'>{curso.duracion}</p>
          <h3>Requisitos mínimos del equipo</h3>
          <ul>
            {curso.requisitosEquipo && curso.requisitosEquipo.map((requisito, index) => (
              <li key={index}>{requisito}</li>
            ))}
          </ul>
        </div>
        <div className='contPag'>
          <h1>Pensum</h1>
          <ul>
            {parsedPensum.map((requisito, index) => (
              <li key={index}>{requisito}</li>
            ))}
          </ul>
        </div>
        <div className="section">
          {/* <CarouselCourses /> */}
        </div>
      </div>
    </>
  );
};

import React, { useEffect, useState, createContext} from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {CoursesPage} from './pages/CoursesPage/CoursesPage'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { AddCoursesPage } from './pages/AddCoursesPage/AddCoursesPage';
import { CoursePage } from './pages/CoursePage/CoursePage';
import { ShoppingCart } from './pages/shoppingCartPage/ShoppingCart';


export const NombreContexto = createContext()

function App() {
  const [carritoId, setCarritoId] = useState(null);

  useEffect(() => {
      // Realiza una solicitud a tu backend para obtener la información de la sesión
      axios.get('http://localhost:3000/api/cursocarrito/mostrar/sesion')
          .then(response => {
              // Verifica si se encontró un ID de carrito en la sesión
              if (response.data && response.data.carritoId) {
                  // Guarda el ID del carrito en el localStorage
                  localStorage.setItem('carritoId', response.data.carritoId);
                  setCarritoId(response.data.carritoId);
              }
          })
          .catch(error => {
              console.error('Error al obtener la información de sesión', error);
          });
  }, []);


  return (

    <Router>
    <div>
      {/* Barra de navegación u otros elementos comunes */}

      {/* Definición de rutas */}
      <Routes>
        {/* Ruta para la página de inicio (página principal por defecto) */}
        <Route path="/" element={<CoursesPage />} />
        <Route path="/Add" element={<AddCoursesPage></AddCoursesPage>} />
        <Route path="/course" element={<CoursePage />} />
        <Route path="/cart" element={<ShoppingCart/>} />
        {/* Ruta para la página "Acerca de" */}
        {/* <Route path="/acerca-de" element={<AcercaDe />} /> */}

        {/* Página de error 404 si la ruta no coincide con ninguna de las anteriores */}
        {/* <Route path="*" element={<PaginaNoEncontrada />} /> */}
      </Routes>
    </div>
  </Router>

   )
}

export default App

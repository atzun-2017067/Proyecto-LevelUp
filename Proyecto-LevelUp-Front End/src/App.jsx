import React from 'react'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {CoursesPage} from './pages/CoursesPage/CoursesPage'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { AddCoursesPage } from './pages/AddCoursesPage/AddCoursesPage';
import { CoursePage } from './pages/CoursePage/CoursePage';
import { ShoppingCart } from './pages/shoppingCartPage/ShoppingCart';



function App() {


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

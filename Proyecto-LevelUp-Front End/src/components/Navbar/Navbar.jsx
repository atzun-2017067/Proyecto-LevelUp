import React from 'react'
import miImagen from '../../assets/img/LevelUp.png';
import './Navbar.css'
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <>
   <nav className="navbar navbar-expand-lg navbar-light custom-navbar">
  <div className="container-fluid" style={{height:'100%'}}>
    <img src={miImagen}/>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" >Programas</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" >Ser mentor</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" >¿Por que Level Up?</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" >Contacto</a>
        </li>
       <button className='rojo'> Aplicar</button>

       <Link to={'/Add'}>
        <button className='rojo'>Agregar Curso</button>
        </Link>
      </ul>
    </div>
  </div>
</nav>

</>
  )
}

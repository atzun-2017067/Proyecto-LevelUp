import React from 'react'
import miImagen from '../../assets/img/LevelUp.png';
import './Navbar.css'

export const Navbar = () => {
  return (
    <>
   <nav className="navbar navbar-expand-lg navbar-light custom-navbar">
  <div className="container-fluid" style={{height:'100%'}}>
    <img src={miImagen}/>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" >Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" >Features</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" >Pricing</a>
        </li>
        <li className="nav-item">
          <a className="nav-link disabled"  tabindex="-1" aria-disabled="true">Disabled</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
</>
  )
}

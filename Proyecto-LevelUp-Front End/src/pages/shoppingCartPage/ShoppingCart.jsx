import React, {useState, useEffect} from 'react'
import './shoppingCart.css'
import { Navbar } from '../../components/Navbar/Navbar'
import { CarouselCourses } from '../../components/CarouselCourses/CarouselCourses'
import Image from '../../assets/img/re.jpg'
import axios from 'axios'

export const ShoppingCart = () => {

  const [cursos, setCursos] = useState([]);

  const url = 'https://levelup.gt/form';
    const abrirURL = () => {
        window.location.href = url;
      };



      useEffect(() => {
        // Hacer la solicitud GET al servidor
        axios.get('http://localhost:3000/api/cursocarrito/mostrar')
          .then((response) => {
            console.log('asdfasds')
            // Cuando la solicitud es exitosa, actualiza el estado con los cursos
            setCursos(response.data);
          })
          .catch((error) => {
            // Manejar errores, por ejemplo, mostrar un mensaje de error
            console.error('Error al obtener los cursos del carrito:', error);
          });
      }, []);



  return (
    <>
      <Navbar></Navbar>
      <div className="pag">
        <h1>Tu Carrito</h1>
        <div className="container">
          <div className="item item-70">
            <div className="infoCourse">
              <h3>Tus cursos añadidos</h3>
              <div className='course'>

                <div className='section'>
                  <div style={{width: '30%'}}>
                    <img src={Image} alt="" className='imgn'/>
                  </div>
                  <div className='inf'>
                    <h3>Curso: </h3>
                    <p>asdf</p>
                  </div>
                  <div className='but'>
                  <i className="bi bi-trash3-fill fs-1" style={{cursor: 'pointer'}}></i>
                  </div>
                </div>

                  <div className="separacion">

</div>
              </div>
              <div className='course'>

<div className='section'>
  <div style={{width: '30%'}}>
    <img src={Image} alt="" className='imgn'/>
  </div>
  <div className='inf'>
    <h3>Curso: </h3>
    <p>asdf</p>
  </div>
  <div className='but'>
  <i className="bi bi-trash3-fill fs-1" style={{cursor: 'pointer'}}></i>
  </div>
</div>

  <div className="separacion">

</div>
</div>

            </div>
          </div>
          <div className="item item-30">
            <div className="infoCour">
              <h2>Curso en el carrito: 3</h2>

              <button class="butCot">
                <div class="text" onClick={abrirURL}>
                  Cotizar todos
                </div>
              </button>
              <button class="butEli">
                <div class="text" >
                  Borrar Carrito
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <CarouselCourses></CarouselCourses> */}
    </>
  )
}

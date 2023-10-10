import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './CoursePage.css';
import { Navbar } from '../../components/Navbar/Navbar';
import { CarouselCourses } from '../../components/CarouselCourses/CarouselCourses'
import ImageLogo from '../../assets/img/LevelUp-Icono.png'
import Image from '../../assets/img/re.jpg'

export const CoursePage = () => {
    const url = 'https://levelup.gt/form';
    const abrirURL = () => {
        window.location.href = url;
    };
    return (
        <>
            <Navbar></Navbar>
            <div className='s'>
                <div className='info'>
                    <h1>HTML</h1>
                    <p className='p'>sasdfadfdsadfasdfasdfasdffffffffffffffffffffff.</p>
                    <div className="cont">
                        <div className="subcon">
                            <h3 className="subs">Modalidad</h3>
                            <p className="mod">asfdaasdfasdfsd</p></div>
                        <div className="subcon">
                            <h3 className="subs">Especialidad</h3>
                            <p className="mod">asfdaasdfasdfsd</p></div>
                    </div>
                    <div className="fraseimag">
                        <h1 className="frase">Con nosotros llegaras al siguiente Nivel</h1>
                        <img src={ImageLogo} alt="" />
                    </div>
                </div>
                <div id="divFijo" >
                    <img src={Image} alt="" />
                    <button class="butCot">

                        <div class="text" onClick={abrirURL}>
                            Cotizar
                        </div>
                    </button>
                    <Link to={'/cart'}>
                        <button class="butCar">
                            <div class="text">
                                Añadir al Carrito
                            </div>
                        </button>
                    </Link>

                    <h3>Duracion</h3>
                    <p className='duracion'>6 Meses</p>
                    <h3>Requisitos min. del equipo</h3>
                    <ul>
                        <li>Computadora con procesador i7 o superior</li>
                        <li>4GB de RAM</li>
                        <li>Internet de 10MB</li>
                    </ul>
                </div>
                <div className='contPag'>
                    <h1>Pensum</h1>
                    <ul className='pens'>
                        <li>Computadora con procesador i7 o superior</li>
                        <li>4GB de RAM</li>
                        <li>Internet de 10MB</li>
                        <li>Computadora con procesador i7 o superior</li>
                        <li>4GB de RAM</li>
                        <li>Internet de 10MB</li>
                        <li>Computadora con procesador i7 o superior</li>
                        <li>4GB de RAM</li>
                        <li>Internet de 10MB</li>
                    </ul>
                </div>
                <div className="section">
                    {/* <CarouselCourses /> */}
                </div>
            </div>

        </>
    );
};

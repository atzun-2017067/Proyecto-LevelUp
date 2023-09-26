import React, { useEffect, useState } from 'react';
import './CoursePage.css';
import { Navbar } from '../../components/Navbar/Navbar';
import { CarouselCourses } from '../../components/CarouselCourses/CarouselCourses'
import ImageLogo from '../../assets/img/LevelUp-Icono.png'

export const CoursePage = () => {
    const [scrolled, setScrolled] = useState(false);
    const [showInitialContent, setShowInitialContent] = useState(true);

    useEffect(() => {
        // Función para manejar el scroll
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setScrolled(true);
                setShowInitialContent(false); // Cambia el contenido cuando se hace scroll
            } else {
                setScrolled(false);
                setShowInitialContent(true); // Vuelve al contenido inicial cuando vuelvas al inicio
            }
        };

        // Agregar el listener de scroll
        window.addEventListener('scroll', handleScroll);

        // Remover el listener cuando el componente se desmonte
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <Navbar></Navbar>
            <div className='s'>
                <div className={`info ${scrolled ? 'scrolled' : ''}`}>
                    <h1>HTML</h1>
                    <p className='p'>sasdfadfdsadfasdfasdfasdffffffffffffffffffffff.</p>
                    <div className="cont">
                        <div className="subcon">
                            <h3 className="subs">Modalidad</h3>
                            <p className="mod">asfdaasdfasdfsd</p></div>
                        <div className="subcon">
                            <h3 className="subs">Tecnologia</h3>
                            <p className="mod">asfdaasdfasdfsd</p></div>
                    </div>
                    <div className="fraseimag">
                    <h1 className="frase">Con nosotros llegaras al siguiente Nivel</h1>
                    <img src={ImageLogo} alt="" />
                    </div>
                </div>
                <div id="divFijo" className={scrolled ? 'scrolled' : ''}>
                    {showInitialContent ? (
                        // Contenido inicial
                        <div>
                            <h2>Contenido Inicial</h2>
                            <p>Este es el contenido cuando está en posición inicial.</p>
                        </div>
                    ) : (
                        // Contenido cuando se hace scroll
                        <div>
                            <h2>Contenido Scroll</h2>
                            <p>Este es el contenido cuando se hace scroll hacia abajo.</p>
                        </div>
                    )}
                </div>
            </div>
            <div className="section">
            <CarouselCourses />
            </div>
        </>
    );
};

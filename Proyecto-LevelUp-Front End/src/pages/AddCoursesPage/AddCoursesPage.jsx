import React, { useState } from 'react';
import './AddCoursesPage.css';
import { Navbar } from '../../components/Navbar/Navbar';
import Swal from 'sweetalert2';
import axios from 'axios';

export const AddCoursesPage = () => {
    const [curso, setCurso] = useState({
        nombreCurso: '',
        modalidad: '',
        descripcion: '',
        precioCurso: '',
        precioPracticaMes: '',
        duracion: '',
        especialidad: '',
        imagenPortada: null,
        estado: true,
    });

    const clearForm = () => {
        setCurso({
            nombreCurso: '',
            modalidad: '',
            descripcion: '',
            precioCurso: '',
            precioPracticaMes: '',
            duracion: '',
            especialidad: '',
            imagenPortada: null,
            estado: true,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (curso.imagenPortada === null) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor, seleccione una imagen',
                confirmButtonText: 'OK'
            });
            return;
        }

        try {
            const formData = new FormData();

            // Agrega los datos del curso al formData
            for (const key in curso) {
                formData.append(key, curso[key]);
            }

            const response = await axios.post('http://localhost:3000/api/cursos/agregar', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 201) {
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: 'El curso se agregó correctamente',
                    confirmButtonText: 'OK'
                });
                clearForm();
            } else {
                console.error('Error en la solicitud al servidor');
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error en la solicitud al servidor',
                    confirmButtonText: 'OK'
                });
            }
        } catch (error) {
            console.error('Error al agregar el curso:', error);
            console.log(formData)
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al agregar el curso',
                confirmButtonText: 'OK'
            });
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCurso({
            ...curso,
            [name]: value,
        });
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setCurso({
            ...curso,
            imagenPortada: file,
        });
    };

    return (
        <>
            <Navbar />
            <div className="glo">
                <h1>Agregar Nuevo Curso</h1>
                <div className="conte">
                    <form className="form" onSubmit={handleSubmit}>
                        <div className="contenedor">
                            <div className="item">
                                <p className='pe'>Nombre</p>
                                <input
                                    type="text"
                                    name="nombreCurso"
                                    value={curso.nombreCurso}
                                    onChange={handleChange}
                                    placeholder="ej. Curso"
                                    id='nombreCurso'
                                />
                            </div>
                            <div className="item">
                                <p className='pe'>Modalidad</p>
                                <select
                                    className='form-select'
                                    id='modalidad'
                                    name="modalidad"
                                    value={curso.modalidad}
                                    onChange={handleChange}
                                >
                                    <option value="">Seleccione una opción</option>
                                    <option value="Presencial">Presencial</option>
                                    <option value='Virtual, con clases en vivo(sincrónico)'>Virtual, con clases en vivo</option>
                                </select>
                            </div>
                            <div className="item">
                                <p className='pe'>Pensum</p>
                                <input
                                    type="text"
                                    name="pensum"
                                    id='pensum'
                                    value={curso.pensum}
                                    onChange={handleChange}
                                    placeholder="ej. Certificado de..."
                                />
                            </div>
                            <div className="item">
                                <p className='pe'>Descripción</p>
                                <input
                                    id='descripcion'
                                    type="text"
                                    name="descripcion"
                                    value={curso.descripcion}
                                    maxLength={232}
                                    placeholder="Máx. 232 letras"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="item">
                                <p className='pe'>Especialidad</p>
                                <select
                                    className='form-select'
                                    id='especialidad'
                                    name="especialidad"
                                    value={curso.especialidad}
                                    onChange={handleChange}
                                >
                                    <option value="">Seleccione una opción</option>
                                    <option value="Marketing">Marketing</option>
                                    <option value='Tecnología'>Tecnología</option>
                                </select>
                            </div>
                            <div className="item">
                                <p className='pe'>Tarifa del curso</p>
                                <input
                                    type="number"
                                    name="precioCurso"
                                    id='precioCurso'
                                    value={curso.precioCurso}
                                    placeholder="ej. 200"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="item">
                                <p className='pe'>Precio por mes</p>
                                <input
                                    type="number"
                                    id='precioPracticaMes'
                                    name="precioPracticaMes"
                                    value={curso.precioPracticaMes}
                                    onChange={handleChange}
                                    placeholder="ej. 200"
                                />
                            </div>
                            <div className="item">
                                <p className='pe'>Duración</p>
                                <input
                                    type="text"
                                    id='duracion'
                                    name="duracion"
                                    value={curso.duracion}
                                    placeholder="ej. 5 meses"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="item">
                                <p className='pe'>Requisitos mín. del equipo</p>
                                {curso.especialidad === 'Marketing' ? (
                                    <ul>
                                        <li>Computadora con procesador Core i5 o superior</li>
                                        <li>4GB de RAM</li>
                                    </ul>
                                ) : curso.especialidad === 'Tecnología' ? (
                                    <ul>
                                        <li>Computadora con procesador i7 o superior</li>
                                        <li>4GB de RAM</li>
                                        <li>Internet de 10MB</li>
                                    </ul>
                                ) : (
                                    <ul>
                                        <li style={{ listStyle: 'none' }}>⠀⠀⠀</li>
                                        <li style={{ listStyle: 'none' }}>⠀⠀⠀</li>
                                        <li style={{ listStyle: 'none' }}>⠀⠀⠀</li>
                                        <li style={{ listStyle: 'none' }}>⠀⠀⠀</li>
                                    </ul>
                                )}
                            </div>
                            <div className="item">
                                <label className="custom-file-input">
                                    <i className="bi bi-card-image"></i>
                                    <span className="custom-file-label">Seleccionar Imagen</span>
                                    <input
                                        type="file"
                                        name="imagenPortada"
                                        id='imagenPortada'
                                        accept=".jpg, .jpeg, .png, .gif"
                                        onChange={handleImageChange}
                                    />
                                </label>
                            </div>
                        </div>
                        <button className="noselect" type='submit'>
                            <span className="text">Agregar</span>
                            <span className="icon"><i className="bi bi-check2-all fs-2"></i></span>
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};
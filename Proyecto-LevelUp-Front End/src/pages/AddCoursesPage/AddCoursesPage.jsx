import React, { useState } from 'react';
import './AddCoursesPage.css';
import { Navbar } from '../../components/Navbar/Navbar';
import Swal from 'sweetalert2';

export const AddCoursesPage = () => {
    const [curso, setCurso] = useState({
        nombreCurso: '',
        modalidad: '',
        pensum: '',
        descripcion: '',
        requisitosEquipo: '',
        precioCurso: '',
        precioPracticaMes: '',
        duracion: '',
        especialidad: '',
        // imagenPortada: '',
        estado: true, // Valor predeterminado
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/api/cursos/agregar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(curso),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Respuesta del servidor:', data); // Muestra la respuesta del servidor en la consola
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: 'El curso se agregó correctamente',
                    confirmButtonText: 'OK'
                });
            } else {
                console.error('Error en la solicitud al servidor');
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: response.error,
                    confirmButtonText: 'OK'
                });
            }
        } catch (error) {
            console.error('Error al agregar el curso:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: data.errores,
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

    return (
        <>
            <Navbar />
            <div className="glo" >
                <h1>Agrega Nuevo Curso</h1>
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
                                    <option value="Presencial">Presencial</option>
                                    <option value='Virtual, con clases en vivo(sincronico)'>Virtual, con clases en vivo(sincrónico)</option>
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
                                />

                        </div>
                        <div class="item">
                            <p className='pe'>Descripcion</p>

                            <input
                            id='descripcion'
  type="text"
  name="descripcion"
  value={curso.descripcion}
  onChange={handleChange}
/>
                        </div>
                        <div class="item">
                            <p className='pe'>Requisitos de equipo</p>

                                <input
                                    type="text"
                                    name="requisitosEquipo"
                                    value={curso.requisitosEquipo}
                                    onChange={handleChange}
                                    id='requisitosEquipo'
                                />
                        </div>
                        <div class="item">
                            <p className='pe'>Tarifa del curso</p>

                                <input
                                    type="number"
                                    name="precioCurso"
                                    id='precioCurso'
                                    value={curso.precioCurso}
                                    onChange={handleChange}
                                />
                          </div>
                        <div class="item">
                            <p className='pe'>Precio por mes</p>

                                <input
                                    type="number"
                                    id='precioPracticaMes'
                                    name="precioPracticaMes"
                                    value={curso.precioPracticaMes}
                                    onChange={handleChange}
                                />
                      </div>
                        <div class="item">
                            <p className='pe'>Duracion</p>

                                <input
                                    type="text"
                                    id='duracion'
                                    name="duracion"
                                    value={curso.duracion}
                                    onChange={handleChange}
                                />

                        </div>
                        <div class="item">
                            <p className='pe'>Especialidad</p>

                                <input
                                    type="text"
                                    id='especialidad'
                                    name="especialidad"
                                    value={curso.especialidad}
                                    onChange={handleChange}
                                />
                            </div>
                            <div class="item">
                                <p className='pe'>Agregar Imagen</p>
                                <label class="custom-file-input">
                                    <i class="bi bi-card-image"></i>
                                    <span class="custom-file-label">Seleccionar Imagen</span>
                                    <input
                                        type="file"
                                        name="imagenPortada"
                                        id='imagenPortada'
                                        accept=".jpg, .jpeg, .png, .gif"
                                        onChange={(e) => setCurso({ ...curso, imagenPortada: e.target.files[0] })}
                                    />
                                </label>
                            </div>
                    </div>
                    <button className="noselect" type='submit'>
                    <span class="text">Agregar</span>
                    <span class="icon"><i class="bi bi-check2-all fs-2"></i></span>
                </button>
                    </form>


                </div>
                {/* <button className="noselect" type='submit'>
                    <span class="text">Agregar</span>
                    <span class="icon"><i class="bi bi-check2-all fs-2"></i></span>
                </button> */}


            </div>
        </>
    )
}
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
        // requisitosEquipo: '',
        precioCurso: '',
        precioPracticaMes: '',
        duracion: '',
        especialidad: '',
        // imagenPortada: '',
        estado: true, // Valor predeterminado
    });
    const clearForm = () => {
        setCurso({
            nombreCurso: '',
            modalidad: '',
            pensum: '',
            descripcion: '',
            precioCurso: '',
            precioPracticaMes: '',
            duracion: '',
            especialidad: '',
            estado: true,
        });
    };



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
                console.log('Respuesta del servidor:', data);

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
                    text: 'INGRESE TODOS LOS DATOS SOLICITADOS',
                    confirmButtonText: 'OK'
                });
            }
        } catch (error) {
            console.error('Error al agregar el curso:', error);
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
                                    <option value="">seleccione una opcion</option>
                                    <option value="Presencial">Presencial</option>
                                    <option value='Virtual, con clases en vivo(sincronico)'>Virtual, con clases en vivo</option>
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
                            <div class="item">
                                <p className='pe'>Descripcion</p>

                                <input
                                    id='descripcion'
                                    type="text"
                                    name="descripcion"
                                    value={curso.descripcion}
                                    maxLength={232}
                                    placeholder="max. 232 letras"
                                    onChange={handleChange}
                                />
                            </div>
                            <div class="item">
                                <p className='pe'>Especialidad</p>

                                <select
                                    className='form-select'
                                    id='especialidad'
                                    name="especialidad"
                                    value={curso.especialidad}
                                    onChange={handleChange}
                                >
                                    <option value="">seleccione una opcion</option>
                                    <option value="Marketing">Marketing</option>
                                    <option value='Tecnología'>Tecnología</option>
                                </select>

                            </div>
                            <div class="item">
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
                            <div class="item">
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
                            <div class="item">
                                <p className='pe'>Duracion</p>

                                <input
                                    type="text"
                                    id='duracion'
                                    name="duracion"
                                    value={curso.duracion}
                                    placeholder="ej. 5 meses"
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <p className='pe'>Requisitos min. del equipo</p>
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
                                    </ul>
                                )}
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
            </div>
        </>
    )
}
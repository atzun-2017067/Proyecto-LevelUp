import React, { useState } from 'react';
import './AddCoursesPage.css';
import { Navbar } from '../../components/Navbar/Navbar';
import Swal from 'sweetalert2';

export const AddCoursesPage = () => {
    const [curso, setCurso] = useState({
        nombreCurso: '',
        modalidad: '',
        pensum: [],
        descripcion: '',
        precioCurso: '',
        precioPracticaMes: '',
        duracion: '',
        especialidad: '',
        imagenPortada: null, // Cambiado a null para inicializar como un objeto File
        estado: true, // Valor predeterminado
    });


    const clearForm = () => {
        setCurso({
            nombreCurso: '',
            modalidad: '',
            pensum: [],
            descripcion: '',
            precioCurso: '',
            precioPracticaMes: '',
            duracion: '',
            especialidad: '',
            imagenPortada: null, // Reiniciar la imagen a null
            estado: true,
        });
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const formData = new FormData();
            formData.append('nombreCurso', curso.nombreCurso);
            formData.append('modalidad', curso.modalidad);
            formData.append('pensum', JSON.stringify(curso.pensum));
            formData.append('descripcion', curso.descripcion);
            formData.append('precioCurso', curso.precioCurso);
            formData.append('precioPracticaMes', curso.precioPracticaMes);
            formData.append('duracion', curso.duracion);
            formData.append('especialidad', curso.especialidad);
            formData.append('imagenPortada', curso.imagenPortada);
            formData.append('estado', curso.estado);

            const response = await fetch('http://localhost:3000/api/cursos/agregar  ', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Respuesta del servidor:', data);

                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: 'El curso se agregó correctamente',
                    confirmButtonText: 'OK',
                });
                clearForm();
                console.log(formData)
            } else {
                console.error('Error en la solicitud al servidor');
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'INGRESE TODOS LOS DATOS SOLICITADOS',
                    confirmButtonText: 'OK',
                });
                console.log(formData)
            }
        } catch (error) {
            console.error('Error al agregar el curso:', error);
        }
    };

    const handleChange = (event) => {
        const { name, value, type, files } = event.target;
        if (type === 'file') {
            setCurso({ ...curso, [name]: files[0] });
        } else {
            setCurso({ ...curso, [name]: value });
        }
    };

    const handlePensumChange = (event) => {
        const { value } = event.target;
        // Divide la cadena por comas y elimina espacios alrededor de cada requisito.
        const pensumArray = value.split(',').map((req) => req.trim());
        setCurso({ ...curso, pensum: pensumArray });
    };



    return (
        <>
            <Navbar />
            <div className="glo">
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
    <p className='pe'>Requisitos mínimos del equipo</p>
    <input
        type="text"
        name="pensum"
        value={curso.pensum.join(', ')} // Convierte el array en una cadena separada por comas
        onChange={handlePensumChange}
        placeholder="Agrega requisitos de equipo (separados por comas)"
    />
</div>

                            <div class="item">
                                <p className='pe'>Descripcion</p>
                                <input
                                    id='descripcion'
                                    type="form-control"
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
                                    name="precioPracticaMes"
                                    id='precioPracticaMes'
                                    value={curso.precioPracticaMes}
                                    onChange={handleChange}
                                    placeholder="ej. 200"
                                />
                            </div>
                            <div class="item">
                                <p className='pe'>Duracion</p>
                                <input
                                    type="text"
                                    name="duracion"
                                    id='duracion'
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
                                        onChange={handleChange}
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
    );
};
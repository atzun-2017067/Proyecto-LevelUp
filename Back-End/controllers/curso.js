const { response, request } = require('express');

const sharp = require('sharp'); // Agrega esta importación

const Curso = require('../models/curso');
const Multimedia = require('../models/multimedia');

const getCurso = async (req = request, res = response) => {
    try {
        console.log('Intentando obtener cursos con estado "true"...');
        const listaCursos = await Curso.findAll({
            where: { estado: 1 }
        });

        // Formatear las fechas y horas en zona horaria local (Guatemala)
        const cursosFormateados = [];

        for (const curso of listaCursos) {
            const cursoInfo = curso.toJSON();
            const cursoId = cursoInfo.id;

            // Consulta para obtener información multimedia desde la segunda base de datos
            const multimediaInfo = await Multimedia.findByPk(cursoId);

            // Convierte la imagen de portada de buffer a cadena Base64
            const imagenPortadaBase64 = multimediaInfo.imagenPortada.toString('base64');

            cursosFormateados.push({
                ...cursoInfo,
                createdAt: new Date(cursoInfo.createdAt).toLocaleString('es-GT', { timeZone: 'America/Guatemala' }),
                updatedAt: new Date(cursoInfo.updatedAt).toLocaleString('es-GT', { timeZone: 'America/Guatemala' }),
                requisitosEquipo: cursoInfo.requisitosEquipo, // Analizar la cadena JSON
                multimedia: multimediaInfo.toJSON, // Agregar información de la multimedia
                imagenPortada: imagenPortadaBase64 // Agrega la imagen como cadena Base64
            });
        }

        res.status(200).json(cursosFormateados);
    } catch (error) {
        console.error('Error al obtener cursos:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}


const postCurso = async (req = request, res = response) => {
    try {

        const {
            nombreCurso,
            modalidad,
            pensum,
            descripcion,
            precioCurso,
            precioPracticaMes,
            duracion,
            especialidad,
            enlaceRegistro,
            estado
        } = req.body

        // Procesa la carga de la imagen
        const imagenPortada = req.file;

        // Verifica si nombreCurso está presente en el cuerpo de la solicitud
        if (!nombreCurso) {
            return res.status(400).json({ error: 'El nombre del curso es requerido' });
        }

        // Verificar si el nombre del curso ya existe en la misma especialidad
        const cursoExistente = await Curso.findOne({
            where: {
                nombreCurso,
                especialidad
            }
        });

        if (cursoExistente) {
            return res.status(400).json({ error: 'El nombre del curso ya existe en esta especialidad' });
        }

        let requisitosEquipo = [];

        // Definir requisitos de equipo según la especialidad
        if (especialidad === 'Marketing') {
            requisitosEquipo = [
                'Computadora con procesador Core i5 o superior',
                '4GB de RAM'
            ];
        } else if (especialidad === 'Tecnología') {
            requisitosEquipo = [
                'Computadora con procesador i7 o superior',
                '4GB de RAM',
                'Internet de 10MB'
            ];
        }

        // Redimensiona y comprime la imagen antes de almacenarla
        const opcionesDeCompresión = {
            quality: 80, // Ajusta la calidad de compresión (0-100)
            fit: 'inside', // Ajusta la imagen al tamaño máximo especificado
            width: 600, // Establece el ancho máximo deseado
            height: 400, // Establece el alto máximo deseado
        };

        const imagenComprimidaBuffer = await sharp(imagenPortada.buffer)
            .resize(opcionesDeCompresión.width, opcionesDeCompresión.height)
            .jpeg({ quality: opcionesDeCompresión.quality })
            .toBuffer();

        const nuevoCurso = await Curso.create({
            nombreCurso,
            modalidad,
            pensum,
            descripcion,
            requisitosEquipo,
            precioCurso,
            precioPracticaMes,
            duracion,
            especialidad,
            enlaceRegistro,
            estado
        });

        const cursoId = nuevoCurso.id;

        // Crea la imagen de portada en la base de datos 2 (db_cursos_level_up_2)
        await Multimedia.create({
            cursoId, // Asocia la imagen de portada con el curso recién creado
            imagenPortada: imagenComprimidaBuffer
        });

        // Formatea las fechas antes de enviar la respuesta
        const cursoGuardado = nuevoCurso.toJSON();
        cursoGuardado.createdAt = new Date(cursoGuardado.createdAt).toLocaleString();
        cursoGuardado.updatedAt = new Date(cursoGuardado.updatedAt).toLocaleString();

        res.status(201).json({
            ok: true,
            curso: cursoGuardado,
            multimedia: {
                nuevaImagenPortada: imagenComprimidaBuffer.toString('base64')
            }
        });
    } catch (error) {
        // Captura los errores personalizados definidos en el modelo Sequelize
        if (error.name === 'SequelizeValidationError') {
            const errores = error.errors.map((err) => ({
                campo: err.path,
                mensaje: err.message
            }));
            return res.status(400).json({ errores });
        } else {
            console.log(error);
            res.status(500).json({
                ok: false,
                error: 'Error al crear el curso'
            });
        }
    }
}


const putCurso = async (req = request, res = response) => {
    const { id } = req.params

    const {
        nombreCurso,
        modalidad,
        pensum,
        descripcion,
        precioCurso,
        precioPracticaMes,
        duracion,
        especialidad,
        enlaceRegistro,
        estado
    } = req.body

    let cursoMismoNombre; // Declarar cursoMismoNombre fuera del bloque if

    const imagenPortada = req.file; // Manejar la imagen como un archivo

    try {
        // Verificar si el curso con el ID proporcionado existe
        const cursoExistente = await Curso.findByPk(id);

        if (!cursoExistente) {
            return res.status(404).json({ error: 'El curso no fue encontrado' });
        }

        // Verificar si el nombre del curso se ha cambiado y si ya existe otro curso con el nuevo nombre
        if (nombreCurso !== cursoExistente.nombreCurso) {
            cursoMismoNombre = await Curso.findOne({
                where: {
                    nombreCurso,
                    especialidad
                }
            });

            if (cursoMismoNombre) {
                return res.status(400).json({ error: 'El nombre del curso ya existe en esta especialidad' });
            }
        }

        // Definir requisitos de equipo según la especialidad
        let requisitosEquipo = cursoExistente.requisitosEquipo;

        if (especialidad === 'Marketing') {
            requisitosEquipo = [
                'Computadora con procesador Core i5 o superior',
                '4GB de RAM'
            ];
        } else if (especialidad === 'Tecnología') {
            requisitosEquipo = [
                'Computadora con procesador i7 o superior',
                '4GB de RAM',
                'Internet de 10MB'
            ];
        }

        // Intenta actualizar el curso con los datos proporcionados
        await cursoExistente.update(
            {
                nombreCurso,
                modalidad,
                pensum,
                descripcion,
                requisitosEquipo,
                precioCurso,
                precioPracticaMes,
                duracion,
                especialidad,
                enlaceRegistro,
                imagenPortada,
                estado
            },
            {
                where: { id },
            });

        // Actualiza la imagen de portada si se proporciona una nueva
        if (imagenPortada) {
            // Redimensiona y comprime la imagen antes de almacenarla
            const opcionesDeCompresión = {
                quality: 80, // Ajusta la calidad de compresión (0-100)
                fit: 'inside', // Ajusta la imagen al tamaño máximo especificado
                width: 600, // Establece el ancho máximo deseado
                height: 400, // Establece el alto máximo deseado
            };

            const imagenComprimidaBuffer = await sharp(imagenPortada.buffer)
                .resize(opcionesDeCompresión.width, opcionesDeCompresión.height)
                .jpeg({ quality: opcionesDeCompresión.quality })
                .toBuffer();

            const cursoId = cursoExistente.id;

            // Busca la imagen de portada existente en la base de datos de Multimedia
            const imagenPortadaExistente = await Multimedia.findByPk(cursoId);

            // Si existe una imagen de portada existente, actualízala; de lo contrario, crea una nueva
            if (imagenPortadaExistente) {
                await imagenPortadaExistente.update({ imagenPortada: imagenComprimidaBuffer });
            } else {
                await Multimedia.create({ cursoId, imagenPortada: imagenComprimidaBuffer });
            }
        }

        res.json({ ok: true, mensaje: 'Curso actualizado correctamente' });

    } catch (error) {
        // Captura los errores personalizados definidos en el modelo Sequelize
        if (error.name === 'SequelizeValidationError') {
            const errores = error.errors.map((err) => ({
                campo: err.path,
                mensaje: err.message
            }));
            return res.status(400).json({ errores });
        } else {
            console.log(error);
            res.status(500).json({
                ok: false,
                error: 'Error al actualizar el curso'
            });
        }
    }
}


const deleteCurso = async (req = request, res = response) => {
    const { id } = req.params

    try {
        // Buscar el curso por ID
        const cursoExistente = await Curso.findByPk(id);

        if (!cursoExistente) {
            return res.status(404).json({ error: 'El curso no fue encontrado' });
        }

        // Obtener el ID de la imagen de portada asociada al curso
        const cursoId = cursoExistente.id;

        // Buscar la imagen de portada en la base de datos de Multimedia utilizando el ID del curso
        const imagenPortadaExistente = await Multimedia.findByPk(cursoId);

        // Eliminar el curso de la base de datos
        await cursoExistente.destroy();

        // Si se encuentra la imagen de portada, eliminarla también
        if (imagenPortadaExistente) {
            await imagenPortadaExistente.destroy();
        }

        res.json({ ok: true, mensaje: 'Curso y su imagen de portada eliminados correctamente' });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            error: 'Error al eliminar el curso'
        });
    }

}


module.exports = {
    getCurso,
    postCurso,
    putCurso,
    deleteCurso
}
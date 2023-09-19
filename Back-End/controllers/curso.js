const { response, request } = require('express');

const Curso = require('../models/curso');

const getCurso = async (req = request, res = response) => {
    try {
        console.log('Intentando obtener cursos con estado "true"...');
        const listaCursos = await Curso.findAll({ where: { estado: 'true' } });

        // Formatear las fechas y horas en zona horaria local (Guatemala)
        const cursosFormateados = listaCursos.map((curso) => ({
            ...curso.toJSON(),
            createdAt: new Date(curso.createdAt).toLocaleString('es-GT', { timeZone: 'America/Guatemala' }),
            updatedAt: new Date(curso.updatedAt).toLocaleString('es-GT', { timeZone: 'America/Guatemala' }),
        }));

        console.log('Cursos encontrados:', cursosFormateados);
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
            requisitosEquipo,
            precioCurso,
            precioPracticaMes,
            duracion,
            especialidad,
            enlaceRegistro,
            imagenPortada,
            estado
        } = req.body

        // Verifica si nombreCurso está presente en el cuerpo de la solicitud
        if (!nombreCurso) {
            return res.status(400).json({ error: 'El nombre del curso es requerido' });
        }

        const nombreCursoExiste = await Curso.findOne({ where: { nombreCurso } });

        if (!nombreCursoExiste) {
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
                imagenPortada,
                estado
            });

            // Formatea las fechas antes de enviar la respuesta
            const cursoGuardado = nuevoCurso.toJSON();
            cursoGuardado.createdAt = new Date(cursoGuardado.createdAt).toLocaleString();
            cursoGuardado.updatedAt = new Date(cursoGuardado.updatedAt).toLocaleString();

            res.status(201).json({
                ok: true,
                curso: cursoGuardado
            });

        } else {
            res.status(400).json({ error: 'El nombre del curso ya existe' })
        }
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
        requisitosEquipo,
        precioCurso,
        precioPracticaMes,
        duracion,
        especialidad,
        enlaceRegistro,
        imagenPortada,
        estado
    } = req.body

    try {
        // Verificar si el curso con el ID proporcionado existe
        const cursoExistente = await Curso.findByPk(id);

        if (!cursoExistente) {
            return res.status(404).json({ error: 'El curso no fue encontrado' });
        }

        // Verificar si el nombre del curso se ha cambiado y si ya existe otro curso con el nuevo nombre
        if (nombreCurso !== cursoExistente.nombreCurso) {
            const nombreCursoExistente = await Curso.findOne({ where: { nombreCurso } });

            if (nombreCursoExistente) {
                return res.status(400).json({ error: 'El nombre del curso ya existe' });
            }
        }

        // Intenta actualizar el curso con los datos proporcionados
        const [dataActualizada] = await Curso.update(
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

        if (dataActualizada === 0) {
            return res.status(404).json({ error: 'El curso no fue encontrado' });
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
                error: 'Error al crear el curso'
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

        // Eliminar el curso de la base de datos
        await cursoExistente.destroy();

        res.json({ ok: true, mensaje: 'Curso eliminado correctamente' });

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
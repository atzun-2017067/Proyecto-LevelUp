const { request, response } = require('express');
const CursoCarrito = require('../models/cursoCarrito');
const Carrito = require('../models/carrito');
const Curso = require('../models/curso');


    const mostrarSesion = (req = request, res = response) => {
        console.log(req.session); // Muestra el objeto de sesión completo
        // Obtén el ID del carrito desde la sesión
        const carritoId = req.session.carritoId;

        if (carritoId) {
            res.status(200).json({ mensaje: 'ID del carrito en la sesión:', carritoId });
        } else {
            res.status(200).json({ mensaje: 'No se encontró ID de carrito en la sesión' });
        }
    };



    const getCarrito = async (req = request, res = response) => {
        try {
            // Obtiene el ID del carrito desde la sesión del usuario
            const carritoId = req.session.carritoId;

            console.log('SIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII PASA POR AQUI', carritoId)

            if (!carritoId) {
                return res.status(404).json({ error: 'Carrito no encontrado' });
            }

            // Busca el carrito por su ID
            const carrito = await Carrito.findByPk(carritoId);

            if (!carrito) {
                return res.status(404).json({ error: 'Carrito no encontrado' });
            }

            // Obtiene los cursos asociados al carrito utilizando la relación muchos a muchos
            const cursos = await carrito.getCursos();

            res.status(200).json(cursos);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener los cursos del carrito' });
        }
    };


const agregarAlCarrito = async (req = request, res = response) => {
    try {
        const { cursoIds } = req.body;

        // Verifica si el carrito existe o créalo si no existe
        let carrito = await Carrito.findOne({ where: { estado: true } });
        if (!carrito) {
            carrito = await Carrito.create({ estado: true });
            console.log('carrtio creado')
        }

        const errores = [];
        // Agrega las entradas en la tabla CursoCarrito para relacionar los cursos y el carrito
        const cursoCarritoPromises = cursoIds.map(async (cursoId) => {
            // Verificar si el curso ya está en el carrito
            const cursoCarritoExistente = await CursoCarrito.findOne({
                where: { cursoId, carritoId: carrito.id }
            });

            if (cursoCarritoExistente) {
                const curso = await Curso.findByPk(cursoId);
                errores.push(`El Curso de ${curso.nombreCurso} con ID ${cursoId} ya está en el carrito.`);
                return null;
            }

            const curso = await Curso.findByPk(cursoId);
            if (!curso) {
                errores.push(`Curso con ID ${cursoId} no encontrado.`);
                return null;
            }
            const cursoCarrito = await CursoCarrito.create({ cursoId, carritoId: carrito.id });
            console.log('cursoCarrito:', cursoCarrito); // Agrega este log
            return cursoCarrito;
        });

        // Espera a que todas las promesas se resuelvan
        await Promise.all(cursoCarritoPromises);

        if (errores.length > 0) {
            return res.status(400).json({ errores });
        }

        // Guarda el ID del carrito en la sesión del usuario
        req.session.carritoId = carrito.id;
        console.log('carrito.id:', carrito.id); // Agrega este log

        // Agrega el ID del carrito a la respuesta
        res.status(200).json({ mensaje: 'Productos agregados al carrito con éxito', carritoId: carrito.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al agregar el producto al carrito' });
    }
};


const deleteCursoCarrito = async (req = request, res = response) => {
    const { cursoId } = req.params; // Obtiene el ID del curso a eliminar del carrito
    const carritoId = req.session.carritoId; // Obtiene el ID del carrito desde la sesión

    try {
        // Buscar el registro en CursoCarrito que coincide con el carritoId y cursoId
        const cursoCarrito = await CursoCarrito.findOne({
            where: { carritoId, cursoId }
        });

        if (!cursoCarrito) {
            return res.status(404).json({ error: 'El curso a eliminar del carrito no fue encontrado' });
        }

        // Eliminar el registro de CursoCarrito
        await cursoCarrito.destroy();

        res.json({ ok: true, mensaje: 'Curso eliminado del carrito correctamente' });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            error: 'Error al eliminar el curso del carrito'
        });
    }
}


const deleteCarrito = async (req = request, res = response) => {
    const carritoId = req.session.carritoId; // Obtiene el ID del carrito desde la sesión

    try {
        if (!carritoId) {
            return res.status(404).json({ error: 'Carrito no encontrado' });
        }

        // Buscar el carrito por su ID
        const carrito = await Carrito.findByPk(carritoId);

        if (!carrito) {
            return res.status(404).json({ error: 'Carrito no encontrado' });
        }

        // Eliminar el carrito
        await carrito.destroy();

        // Eliminar el ID del carrito de la sesión del usuario
        delete req.session.carritoId;

        res.json({ ok: true, mensaje: 'Carrito eliminado correctamente' });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            error: 'Error al eliminar el carrito'
        });
    }
}


module.exports = {
    mostrarSesion,
    getCarrito,
    agregarAlCarrito,
    deleteCursoCarrito,
    deleteCarrito
};
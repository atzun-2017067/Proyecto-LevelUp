const { response, request } = require('express');
const Carrito = require('../models/carrito');

const postCarrito = async (req = request, res = response) => {
    try {
        const { estado } = req.body;
        const nuevoCarrito = await Carrito.create({ estado });

        // Formatea las fechas antes de enviar la respuesta
        const carritoGuardado = nuevoCarrito.toJSON();
        carritoGuardado.createdAt = new Date(carritoGuardado.createdAt).toLocaleString();
        carritoGuardado.updatedAt = new Date(carritoGuardado.updatedAt).toLocaleString();

        res.status(201).json({ ok: true, carrito: carritoGuardado });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, error: 'Error al crear el carrito' });
    }
};

module.exports = {
    postCarrito
};
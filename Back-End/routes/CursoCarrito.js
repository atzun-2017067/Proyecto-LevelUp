const { Router } = require('express');

const { validarCampos } = require('../middlewares/validar-campos');
const { mostrarSesion, getCarrito, agregarAlCarrito, deleteCursoCarrito, deleteCarrito } = require('../controllers/cursoCarrito');

const router = Router();

router.get('/mostrar/sesion', mostrarSesion);

router.get('/mostrar', getCarrito);

router.post('/agregar', [
    validarCampos
], agregarAlCarrito);

router.delete('/eliminar-curso/:cursoId', deleteCursoCarrito);

router.delete('/eliminar-carrito', deleteCarrito)

module.exports = router;
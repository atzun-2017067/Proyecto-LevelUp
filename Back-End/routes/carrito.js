const { Router } = require('express');

const { validarCampos } = require('../middlewares/validar-campos');
const { postCarrito } = require('../controllers/carrito');

const router = Router();

router.post('/agregar', [
    validarCampos
], postCarrito)

module.exports = router;
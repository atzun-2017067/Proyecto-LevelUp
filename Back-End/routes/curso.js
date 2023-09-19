const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { getCurso, postCurso, putCurso, deleteCurso } = require('../controllers/curso');

const router = Router();

router.get('/mostrar', getCurso);

router.post('/agregar', [
    validarCampos
], postCurso)

router.put('/editar/:id', [
    validarCampos
], putCurso)

router.delete('/eliminar/:id', deleteCurso)

module.exports = router;
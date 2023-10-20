const { Router } = require('express');
const { check } = require('express-validator');

const upload = require('./multer'); // Asegúrate de tener un archivo multer.js configurado en tu proyecto

const { validarCampos } = require('../middlewares/validar-campos');
const { getCurso, postCurso, putCurso, deleteCurso, getCursoById } = require('../controllers/curso');

const router = Router();

router.get('/mostrar', getCurso);
router.get('/mostrarId/:id', getCursoById);

router.post('/agregar', upload.single('imagenPortada'), [
    validarCampos
], postCurso)

router.put('/editar/:id', upload.single('imagenPortada'), [
    validarCampos
], putCurso)

router.delete('/eliminar/:id', deleteCurso)

module.exports = router;
const {Router} = require('express');
const router = Router();
const { check } = require('express-validator');

const { crearEstado, getEstados, updateEstado, deleteEstado} = require('../controllers/Estado');

const { validarJWT } = require('../middlewares/validar-jwt');
const { validarRoles } = require('../middlewares/validar-roles');
const { validarCampos } = require('../middlewares/validar-campos');

router.get('/get', validarJWT, getEstados);

router.post('/crear', 
    validarJWT,
    [
        check('nombre','Nombre del estado es oligatorio').not().isEmpty().trim(),
        check('descripcion','La descripcion del estado es oligatoria').not().isEmpty().trim(),
        check('tipo','El tipo de estado es obligatorio').not().isEmpty().trim(),
    ],
    validarCampos,
    validarRoles(['Admin']), 
    crearEstado);

router.put('/update/:id', 
    validarJWT, 
    [
        check('nombre','Nombre del estado es oligatorio').not().isEmpty().trim(),
        check('descripcion','La descripcion del estado es oligatoria').not().isEmpty().trim(),
        check('tipo','El tipo de estado es obligatorio').not().isEmpty().trim(),
    ],
    validarCampos,
    validarRoles(['Admin']), 
    updateEstado);

router.delete('/delete/:id', validarJWT, validarRoles(['Admin']), deleteEstado);

module.exports = router;
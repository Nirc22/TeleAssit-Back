const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { crearServicio, getServicios, updateServicio, deletServicio } = require('../controllers/Servicio');

const { validarJWT } = require('../middlewares/validar-jwt');
const { validarRoles } = require('../middlewares/validar-roles');
const { validarCampos } = require('../middlewares/validar-campos');


router.get('/get', validarJWT, getServicios);

router.post(
    '/create',
    validarJWT,
    [
        check('nombre', 'El nombre del servicio es obligatorio').not().isEmpty(),
        check('descripcion', 'La descripción del servicio es obligatoria').not().isEmpty(),
        check('precio', 'El precio del servicio es obligatorio').not().isEmpty(),
    ],
    validarCampos,
    validarRoles(['Admin']),
    crearServicio
);

router.put('/update/:id', validarJWT,
    [
        check('nombre', 'El nombre del servicio es obligatorio').not().isEmpty(),
        check('descripcion', 'La descripción del servicio es obligatoria').not().isEmpty(),
        check('precio', 'El precio del servicio es obligatorio').not().isEmpty(),
    ],
    validarCampos,
    validarRoles(['Admin']), updateServicio);

router.delete('/delete/:id', validarJWT, validarRoles(['Admin']), deletServicio);

module.exports = router;
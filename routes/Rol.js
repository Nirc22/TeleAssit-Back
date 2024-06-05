const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { crearRol, getRoles } = require('../controllers/Rol');

const { validarJWT } = require('../middlewares/validar-jwt');
const { validarRoles } = require('../middlewares/validar-roles');
const { validarCampos } = require('../middlewares/validar-campos');

router.post(
    '/create', 
    validarJWT,
    [
        check('nombre','El nombre del rol es obligatorio').not().isEmpty(),
        check('permisos','Los permisos del rol son obligatorios').not().isEmpty(),
    ],
    validarCampos,
    validarRoles(['Admin']),
    crearRol
);

router.get('/getRoles', 
    validarJWT,
    getRoles
);


module.exports = router;

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { crearRol, getRoles } = require('../controllers/Rol');

router.post(
    '/create', 
    // [
    //     check('nombre','El nombre del rol es obligatorio').not().isEmpty(),
    // ],
    // validarCampos,
    // validarJWT,
    // AdminRole,
    crearRol
    );

router.get('/getRoles', getRoles);


module.exports = router;

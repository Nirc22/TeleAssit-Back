const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');

const { crearUsuario, getUsuarios, updateUsuario, deleteUsuario, loginUsuario, activarCuenta } = require('../controllers/Usuario');

const { validarJWT } = require('../middlewares/validar-jwt');
const { validarRoles } = require('../middlewares/validar-roles');
const { validarCampos } = require('../middlewares/validar-campos');


router.get('/get', validarJWT, validarRoles(['Admin', 'Empleado']), getUsuarios);

router.post('/crear',
    validarJWT,
    [
        check('nombres', 'Nombres son obligatorios').not().isEmpty().trim(),
        check('apellidos', 'Apellidos son obligatorio').not().isEmpty().trim(),
        check('email', 'El email es obligatorio').isEmail(),
        check('rolId', 'El rol es obligatorio').not().isEmpty(),
    ],
    validarCampos,
    validarRoles(['Admin', 'Empleado']),
    crearUsuario);

router.put('/update/:id', 
    validarJWT,
    validarRoles(['Admin', 'Empleado']), 
    updateUsuario);

router.delete('/delete/:id', validarJWT, validarRoles(['Admin']), deleteUsuario);

router.post('/login', loginUsuario);

router.post('/activate/:token', 
    [
        check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
    ],
    validarCampos,
    activarCuenta);

module.exports = router;
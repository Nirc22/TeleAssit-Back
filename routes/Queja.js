const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');

const { crearQueja, getQuejas, updateQueja, deleteQueja} = require('../controllers/Queja');

const { validarJWT } = require('../middlewares/validar-jwt');
const { validarRoles } = require('../middlewares/validar-roles');
const { validarCampos } = require('../middlewares/validar-campos');

router.get('/get', validarJWT, getQuejas);

router.post('/crear', 
    validarJWT, 
    [
        check('usuarioId','Usuario es obligatorio').not().isEmpty(),
        check('titulo','El titulo de la queja es obligatorio').not().isEmpty(),
        check('descripcion','La descripcion es obligatoria').not().isEmpty(),
    ],
    validarCampos,
    validarRoles(['Usuario']), 
    crearQueja);


router.put('/update/:id', 
    validarJWT, 
    // [
    //     // check('usuarioId','Usuario es obligatorio').not().isEmpty(),
    //     // check('titulo','El titulo de la queja es obligatorio').not().isEmpty(),
    //     // check('descripcion','La descripcion es obligatoria').not().isEmpty(),
    //     check('estadoId','El estado es obligatorio').not().isEmpty(),
    //     check('empleadoId','El empleado es obligatorio').not().isEmpty(),
    // ],
    // validarCampos,
    // validarRoles(['Admin', 'Empleado']),
    updateQueja);

router.delete('/delete/:id', validarJWT, validarRoles(['Admin']), deleteQueja);

module.exports = router;
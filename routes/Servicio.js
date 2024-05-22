const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { crearServicio, getServicios, updateServicio, deletServicio } = require('../controllers/Servicio');

router.get('/getServicios', getServicios);

router.post(
    '/create', 
    // [
    //     check('nombre','El nombre del rol es obligatorio').not().isEmpty(),
    // ],
    // validarCampos,
    // validarJWT,
    // AdminRole,
    crearServicio
    );

router.put('/updateServicio/:id', updateServicio);

router.delete('/deleteServicio/:id', deletServicio);

module.exports = router;
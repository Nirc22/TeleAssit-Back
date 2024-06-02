const { Router } = require('express');
const router = Router();
const {validarRoles} = require('../middlewares/validar-roles');
const { validarJWT } = require('../middlewares/validar-jwt');


const { crearEmpleado, getEmpleados, updateEmpleado, deleteEmpleado, sendActivationEmail} = require('../controllers/Empleado');

router.post('/crear', validarJWT ,validarRoles(['Empleado', 'Usuario']),crearEmpleado);

router.get('/get', getEmpleados);

router.put('/update/:id', updateEmpleado);

router.delete('/delete/:id', deleteEmpleado);

router.post('/email', sendActivationEmail);

module.exports = router;
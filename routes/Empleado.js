const { Router } = require('express');
const router = Router();

const { crearEmpleado, getEmpleados, updateEmpleado, deleteEmpleado} = require('../controllers/Empleado');

router.post('/crear', crearEmpleado);

router.get('/get', getEmpleados);

router.put('/update/:id', updateEmpleado);

router.delete('/delete/:id', deleteEmpleado);

module.exports = router;
const { Router } = require('express');
const router = Router();

const { crearUsuario, getUsuarios, updateUsuario, deleteUsuario, loginUsuario, activarCuenta } = require('../controllers/Usuario');

router.get('/get', getUsuarios);

router.post('/crear', crearUsuario);

router.put('/update/:id', updateUsuario);

router.delete('/delete/:id', deleteUsuario);

router.post('/login', loginUsuario)

router.post('/activate/:token', activarCuenta)

module.exports = router;
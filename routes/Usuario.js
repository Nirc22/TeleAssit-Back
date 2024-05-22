const { Router } = require('express');
const router = Router();

const { crearUsuario, getUsuarios, updateUsuario, deleteUsuario } = require('../controllers/Usuario');

router.get('/get', getUsuarios);

router.post('/crear', crearUsuario);

router.put('/update/:id', updateUsuario);

router.delete('/delete/:id', deleteUsuario);

module.exports = router;
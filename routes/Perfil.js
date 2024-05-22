const { Router } = require('express');
const router = Router();

const { crearPerfil} = require('../controllers/Perfil');

router.post('/crear', crearPerfil);

module.exports = router;
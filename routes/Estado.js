const {Router} = require('express');
const router = Router();

const { crearEstado, getEstados, updateEstado, deleteEstado} = require('../controllers/Estado');

router.get('/get', getEstados);

router.post('/crear', crearEstado);

router.put('/update/:id', updateEstado);

router.delete('/delete/:id', deleteEstado);

module.exports = router;
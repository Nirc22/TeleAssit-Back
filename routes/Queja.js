const { Router } = require('express');
const router = Router();

const { crearQueja, getQuejas, updateQueja, deleteQueja} = require('../controllers/Queja');

router.post('/crear', crearQueja);

router.get('/get', getQuejas);

router.put('/update/:id', updateQueja);

router.delete('/delete/:id', deleteQueja);

module.exports = router;
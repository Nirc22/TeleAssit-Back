const express = require('express');
require('dotenv').config();
const {dbConnection} = require('./database/config');
const { join } = require('path');


const app = express();

dbConnection();

app.use(express.json());

app.use('/api/rol', require('./routes/Rol'));



app.listen(process.env.Port, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.Port}`);
});

module.exports = app
const { Schema, model } = require('mongoose');

const ServicioShema = Schema({
    nombre: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
    },
    precio: {
        type: Number,
        required: true,
    }
},
{
    collection: 'servicios'
});

module.exports = model('servicio', ServicioShema);
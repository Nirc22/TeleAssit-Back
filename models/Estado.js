const { Schema, model } = require('mongoose');

const EstadoShema = Schema({
    nombre: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
    },
    tipo: {
        type: String,
        required: true,
        enum: ['queja', 'usuario'], // Añade aquí otros tipos si es necesario
    },
});
// {
//     collection: 'estados'
// });

module.exports = model('estado', EstadoShema);
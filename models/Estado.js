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
});
// {
//     collection: 'estados'
// });

module.exports = model('estado', EstadoShema);
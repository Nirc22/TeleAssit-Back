const { Schema, model } = require('mongoose');

const ServicioShema = Schema({
    nombres: {
        type: String,
        required: true,
    },
    apellidos: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    rol: {
        type: Schema.Types.ObjectId,
        ref: 'rol',
        required: true,
    },
    perfil: {
        type: Schema.Types.ObjectId,
        ref: 'perfil',
        required: true,
    },
    creado:{ 
        type: Date, 
        default: Date.now 
    },
},{ timestamps: true },
{
    collection: 'servicios'
});

module.exports = model('servicio', ServicioShema);
const { Schema, model } = require('mongoose');

const UsuarioShema = Schema({
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
        unique: true,
    },
    password: {
        type: String,
        // required: true
    },
    rolId: {
        type: Schema.Types.ObjectId,
        ref: 'rol',
        default: '664d1f00dda2a4608c0eef8a',
        required: true,
    },
    servicioId:{
        type: Schema.Types.ObjectId,
        ref: 'servicio',
        required: true,
    },
    quejas: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'queja',
    }],
    estadoId:{
        type: Schema.Types.ObjectId,
        ref: 'estado',
        required: true,
    },
    // perfilId: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'perfil',
    //     required: true,
    // },
    creado:{ 
        type: Date, 
        default: Date.now 
    },
},{ timestamps: true },);

module.exports = model('usuario', UsuarioShema);
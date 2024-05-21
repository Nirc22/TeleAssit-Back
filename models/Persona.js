const { Schema, model } = require('mongoose');

const PersonaShema = Schema({
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
        required: true,
    },
    perfilId: {
        type: Schema.Types.ObjectId,
        ref: 'perfil',
        required: true,
    },
    creado:{ 
        type: Date, 
        default: Date.now 
    },
},{ timestamps: true },);

module.exports = model('persona', PersonaShema);
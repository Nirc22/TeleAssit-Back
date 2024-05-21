const { Schema, model } = require('mongoose');

const PerfilShema = Schema({
    usuarioId: {
        type: Schema.Types.ObjectId,
        ref: 'usuario',
        required: true,
    },
    servicioId: {
        type: Schema.Types.ObjectId,
        ref: 'servicio',
        required: true,
    },
    quejas: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'queja',
    }],
},
{
    collection: 'perfiles'
});

module.exports = model('perfil', PerfilShema);
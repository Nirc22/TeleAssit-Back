const { Schema, model } = require('mongoose');

const QuejaSchema = Schema({
    usuarioId: {
        type: Schema.Types.ObjectId,
        ref: 'persona',
        required: true,
    },
    titulo: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
    },
    estadoId:{
        type: Schema.Types.ObjectId,
        ref: 'estado',
        required: true,
    },
    calificacion:{
        type: Number,
    },
    solucionDesc:{
        type: String,
    },
    trabajadorId:{
        type: Schema.Types.ObjectId,
        ref: 'persona',
        required: true,
    },
    
},{ timestamps: true },);

module.exports = model('queja', QuejaSchema)
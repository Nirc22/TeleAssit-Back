const { Schema, model } = require('mongoose');

const QuejaSchema = Schema({
    usuarioId: {
        type: Schema.Types.ObjectId,
        ref: 'usuario',
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
        default: '664e19f0a93051fb6984493a',
        required: true,
    },
    calificacion:{
        type: Number,
    },
    solucionDesc:{
        type: String,
    },
    empleadoId:{
        type: Schema.Types.ObjectId,
        ref: 'empleado',
        // required: true,
    },
    
},{ timestamps: true },);

module.exports = model('queja', QuejaSchema)
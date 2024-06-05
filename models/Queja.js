const { Schema, model } = require('mongoose');
const Rol = require('../models/Rol');
const Usuario = require('../models/Usuario');

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

// Middleware consolidado para findOneAndUpdate
// QuejaSchema.pre('findOneAndUpdate', async function (next) {
//     const update = this.getUpdate();
//     console.log(update);
//     // const user = await this.model.findOne(this.getQuery());
//     const usuario = await Usuario.findById(update.empleadoId);
//     const rol = await Rol.findById(usuario.rolId);
    
//     if (update.estadoId && rol.nombre !== 'Empleado') {
//         return next(new Error('Solo los usuarios con el rol de Empleado pueden modificar el estado.'));
//     }
//     if (update.solucionDesc && rol.nombre !== 'Empleado') {
//         return next(new Error('Solo los usuarios con el rol de Empleado pueden modificar la solucion.'));
//     }
//     if (update.empleadoId && rol.nombre !== 'Empleado') {
//         return next(new Error('Solo los usuarios con el rol de Empleado pueden modificar el empleado.'));
//     }
//     next();
// });

module.exports = model('queja', QuejaSchema)
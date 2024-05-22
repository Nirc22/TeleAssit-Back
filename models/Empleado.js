const {Schema, model} = require('mongoose');

const EmpleadoSchema = Schema({
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
        default: '664d1eecdda2a4608c0eef88',
        required: true,
    },
    // servicioId:{
    //     type: Schema.Types.ObjectId,
    //     ref: 'servicio',
    //     required: true,
    // },
    quejasAtendidas: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'queja',
    }],
    estadoId:{
        type: Schema.Types.ObjectId,
        ref: 'estado',
        required: true,
    },
    // creado:{ 
    //     type: Date, 
    //     default: Date.now 
    // },
},{ timestamps: true },);

module.exports = model('empleado', EmpleadoSchema)
const { Schema, model } = require('mongoose');

const RolSchema = Schema({
    nombre: {
        type: String,
        required: true,
    },
    permisos:{ 
        type: [String], 
        required: true },
},
{
    collection: 'roles'
});

module.exports = model('rol', RolSchema)
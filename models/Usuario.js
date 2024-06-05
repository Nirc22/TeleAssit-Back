const { Schema, model } = require('mongoose');
const Rol = require('../models/Rol');

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
        // default: '664d1f00dda2a4608c0eef8a',
        required: true,
    },
    servicioId: {
        type: Schema.Types.ObjectId,
        ref: 'servicio',
        required: function () {
            return this.rolId && this.rolNombre === 'Usuario'; // Valida si el nombre del rol enviado es Usuario
        },
        validate: {
            validator: function (value) {//value toma el valor del servicioId que estamos enviado en el body
                return (this.rolNombre === 'Usuario' && value); // || (this.rolNombre !== 'Usuario' && !value); // Campo solo puede ser llenado si el rol es 'Usuario'
            },
            message: 'El campo servicioId solo puede ser llenado por usuarios con el rol de Usuario.',
        },
    },
    quejas: [{
        type: Schema.Types.ObjectId,
        ref: 'queja',
        required: function () {
            return this.rolNombre === 'Usuario'; // Campo requerido solo si el rol es 'Usuario'
        },
        validate: {
            validator: function (value) {
                // return (this.rolNombre === 'Usuario' && value && value.length > 0) || (this.rolNombre !== 'Usuario' && (!value || value.length === 0)); // Campo solo puede ser llenado si el rol es 'Usuario'
                return (this.rolNombre === 'Usuario' && value);// || (this.rolNombre !== 'Usuario' && (!value || value.length === 0)); // Campo solo puede ser llenado si el rol es 'Usuario'
            },
            message: 'El campo quejas solo lo pueden tener usuarios con el rol de Usuario.',
        },
    }],
    quejasAtendidas: [{
        type: Schema.Types.ObjectId,
        ref: 'queja',
        required: function () {
            return this.rolNombre === 'Empleado'; // Campo requerido solo si el rol es 'Usuario'
        },
        validate: {
            validator: function (value) {
                return (this.rolNombre === 'Empleado' && value);// || (this.rolNombre !== 'Empleado' && (!value || value.length === 0)); // Campo solo puede ser llenado si el rol es 'Usuario'
            },
            message: 'El campo quejas atendidas solo lo pueden tener usuarios con el rol de Empleado.',
        },
    }],
    activo: {
        type: Boolean,
        default: false,
        required: true,
    },
    tokenActivacion: {
        type: String,
        // required: true,
    }
}, { timestamps: true },);

//Middleware que se ejecuta antes de la validacion del esquema
UsuarioShema.pre('validate', async function (next) {
    if (this.rolId) {
        const rol = await Rol.findById(this.rolId);//Busca el rol mediante el rolId enviado en el body
        this.rolNombre = rol ? rol.nombre : null; //Si el rol enviado en el body existe, se almacena el nombre del rol, si no existe queda en null
    }
    next();
});


// Middleware consolidado para findOneAndUpdate
UsuarioShema.pre('findOneAndUpdate', async function (next) {
    const update = this.getUpdate();
    // if (update.rolId) {
    //     const rol = await Rol.findById(update.rolId);
    //     console.log(rol)
    //     if (rol) update.rolNombre = rol.nombre;
    // }
    
    const user = await this.model.findOne(this.getQuery());
    const rol = await Rol.findById(user.rolId);
    
    if (update.servicioId && rol.nombre !== 'Usuario') {
        return next(new Error('Solo los usuarios con el rol de Usuario pueden tener un servicioId.'));
    }
    if (update.quejas && rol.nombre !== 'Usuario') {
        return next(new Error('Solo los usuarios con el rol de Usuario pueden tener quejas.'));
    }
    if (update.quejasAtendidas && rol.nombre !== 'Empleado') {
        return next(new Error('Solo los usuarios con el rol de Empleado pueden tener quejas atendidas.'));
    }
    next();
});

//Middleware
// UsuarioShema.pre('findOneAndUpdate', async function (next) {
//     const update = this.getUpdate();//Retorna un objeto con los campos que se están actualizando y sus valores
//     if (update.servicioId) {
//         const user = await this.model.findOne(this.getQuery());//Trae el documento del usuario que se está actualizando
//         const rol = await Rol.findById(user.rolId);//Trae el documento del rol correspondiente al rol del usuario que se está actualizando
//         if (rol.nombre !== 'Usuario') {//Si el rol es distinto a Usuario lanza el error
//             return next(new Error('Solo los usuarios con el rol de Usuario pueden tener un servicioId.'));
//         }
//     }
//     next();
// });

// UsuarioShema.pre('findOneAndUpdate', async function (next) {
//     const update = this.getUpdate();//Retorna un objeto con los campos que se están actualizando y sus valores
//     if (update.quejas) {
//         const user = await this.model.findOne(this.getQuery());//Trae el documento del usuario que se está actualizando
//         const rol = await Rol.findById(user.rolId);//Trae el documento del rol correspondiente al rol del usuario que se está actualizando
//         if (rol.nombre !== 'Usuario') {//Si el rol es distinto a Usuario lanza el error
//             return next(new Error('Solo los usuarios con el rol de Usuario pueden tener quejas.'));
//         }
//     }
//     next();
// });

// UsuarioShema.pre('findOneAndUpdate', async function (next) {
//     const update = this.getUpdate();//Retorna un objeto con los campos que se están actualizando y sus valores
//     if (update.quejasAtendidas) {
//         const user = await this.model.findOne(this.getQuery());//Trae el documento del usuario que se está actualizando
//         const rol = await Rol.findById(user.rolId);//Trae el documento del rol correspondiente al rol del usuario que se está actualizando
//         if (rol.nombre !== 'Empleado') {//Si el rol es distinto a Usuario lanza el error
//             return next(new Error('Solo los usuarios con el rol de Empleado pueden tener quejas atendidas.'));
//         }
//     }
//     next();
// });

// Middleware para eliminar campos no permitidos antes de guardar
UsuarioShema.pre('save', function (next) {
    if (this.rolNombre !== 'Empleado') {
        this.quejasAtendidas = undefined; // Vaciar el campo de quejasAtendidas si el rol no es de Empleado
    }
    if (this.rolNombre !== 'Usuario') {
        this.quejas = undefined; // Vaciar el campo de quejas si el rol no es de Usuario
    }
    next();
});

// UsuarioShema.pre('save', async function (next) {
//     if (this.rolNombre !== 'Empleado') {
//         this.quejasAtendidas = undefined; // Vaciar el campo de quejasAtendidas si el rol no es de Empleado
//     }
//     next();
// });

// UsuarioShema.pre('save', async function (next) {
//     if (this.rolNombre !== 'Usuario') {
//         this.quejas = undefined; // Vaciar el campo de quejasAtendidas si el rol no es de Usuario
//     }
//     next();
// });





module.exports = model('usuario', UsuarioShema);
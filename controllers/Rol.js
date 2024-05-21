const { response } = require('express');
const Rol = require('../models/Rol');

const crearRol = async (req, resp) => {

    const rol = new Rol(req.body);

    try {
        const rolSave = await rol.save();
        resp.status(201).json({
            ok: true,
            msg: 'Rol creado de manera exitosa',
            rolSave
        });

    } catch (error) {
        console.log(error);
        resp.status(400).json({
            ok: false,
            msg: 'error al crear rol',
        });
    }
};

const getRoles = async(req, resp) => {
    try {
        const rol = await Rol.find().populate('nombre');
        resp.status(200).json({
            ok: true,
            msg: 'Lista de roles',
            rol,
        });
    } catch (error) {
        console.log(error);
        resp.status(400).json({
            ok:false,
            msg: 'Error al listar roles',
            error,
        });
    }
}

module.exports = {
    crearRol,
    getRoles,
};
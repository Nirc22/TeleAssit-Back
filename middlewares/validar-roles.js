const { response } = require('express');
const Rol = require('../models/Rol');

const validarRoles = (rolesPermitidos) => {
    return async (req, res = response, next) => {
        if (req.usuario) {
            const { nombres, rolId } = req.usuario;
            console.log(nombres,rolId)
            const userRol = await Rol.findById(rolId);
            console.log(userRol);

            if (!userRol || !rolesPermitidos.includes(userRol.nombre)) {
                return res.status(403).json({
                    ok: false,
                    msg: `${nombres} no tiene permiso para realizar esta acción`
                });
            }

            next();
        } else {
            return res.status(400).json({
                ok: false,
                msg: 'Se quiere validar el rol sin validar el token'
            });
        }
    };
};

module.exports = {
    validarRoles
};
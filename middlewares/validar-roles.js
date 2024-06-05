const { response } = require('express');
const Rol = require('../models/Rol');

const validarRoles = (rolesPermitidos) => {
    return async (req, res = response, next) => {
        if (req.usuario) {
            const { nombres, rolId } = req.usuario;
            const userRol = await Rol.findById(rolId);

            if (!userRol || !rolesPermitidos.includes(userRol.nombre)) {
                return res.status(403).json({
                    ok: false,
                    msg: `${nombres} no tiene permiso para realizar esta acción`
                });
            }

            // Verificación adicional para la creación de usuarios
            if (req.method === 'POST' && req.path.includes('/crear')) {
                const { rolId: rolNuevoId } = req.body;
                const rolNuevo = await Rol.findById(rolNuevoId);

                if (userRol.nombre === 'Empleado' && rolNuevo.nombre !== 'Usuario') {
                    return res.status(403).json({
                        ok: false,
                        msg: 'Empleados solo pueden crear usuarios con rol Usuario'
                    });
                }
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
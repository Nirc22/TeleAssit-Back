const { response } = require('express');
const {validationResult} = require('express-validator');

const validarCampos = (req, resp = response, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMsgs = errors.array().reduce((acc, error) => {
            acc[error.path] = error.msg;
            return acc;
        }, {});
        
        return resp.status(400).json({
            ok: false,
            // msg: 'Error al crear usuario',
            error: errorMsgs,
        });
    }
    next();
}


module.exports = {
    validarCampos
}
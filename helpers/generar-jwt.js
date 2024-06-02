const jwt = require('jsonwebtoken');

const generarJWT = (uid, rol, nombre) => {
    return new Promise((resolve) => {
        const payload = {uid, rol, nombre};
        // const payload = {uid, rol};


        jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: '4h'
        }, (err, token) => {
            if(err) {
                console.log(err);
                reject('No se pudo generar el token')
            } else {
                resolve(token)
            }
        })
    });
};

module.exports = {
    generarJWT,
};
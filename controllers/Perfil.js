const Perfil = require('../models/Perfil');

const crearPerfil = async(req, resp) =>{
    const perfil = await Perfil(req.body);
    try {
        const perfilSave = await perfil.save();
        return resp.status(200).json({
            ok: true, 
            msg: 'Perfil creado',
            perfilSave,
        });
    } catch (error) {
        console.log(error);
        return resp.status(400).json({
            ok: false,
            msg: 'Error al crear perfil',
        });
    }

};

module.exports = {
    crearPerfil,
}
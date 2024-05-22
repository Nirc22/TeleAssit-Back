const Usuario = require('../models/Usuario');

const crearUsuario = async(req, resp) =>{
    const usuario = new Usuario(req.body);
    try {
        const usuarioSave = await usuario.save();
        return resp.status(200).json({
            ok: true,
            msg: 'Usuario creado.',
            usuarioSave,
        });
    } catch (error) {
        console.log(error);
        return resp.status(400).json({
            ok: false,
            msg: 'Error al crear Usuario.',
            // error: error.message,
        });
    }
};

const getUsuarios = async(req, resp) =>{
    try {
        const usuarios = await Usuario.find().populate('rolId').populate('servicioId').populate('estadoId');
        return resp.status(200).json({
            ok: true,
            msg: 'Lista de usuarios',
            usuarios,
        });
    } catch (error) {
        console.log(error);
        return resp.status(400).json({
            ok: false, 
            msg: 'Error al listar usuarios',
        });
    }
};

const updateUsuario = async(req, resp) => {
    const usuarioId = req.params.id;
    try {
        const usuario = await Usuario.findById(usuarioId);
        if(!usuario){
            return resp.status(404).json({
                ok: false,
                msg: 'El Id no coincide con ningún elemento de la BD',
            });
        }

        const usuarioActualizado = await Usuario.findByIdAndUpdate(usuarioId, req.body, {new: true});
        return resp.status(200).json({
            ok: true,
            msg: 'Usuario actualizado',
            usuarioActualizado,
        });
    } catch (error) {
        console.log(error);
        return resp.status(200).json({
            ok: false,
            msg: 'Error al actualizar usuario.'
        });
    }
};

const deleteUsuario = async(req, resp) => {
    const usuarioId = req.params.id;
    try {
        const usuario = await Usuario.findById(usuarioId);
        if(!usuario){
            return resp.status(404).json({
                ok: false,
                msg: 'El Id no corresponde a ningún usuario',
            });
        }
        await Usuario.findByIdAndDelete(usuarioId);
        return resp.status(200).json({
            ok: true,
            msg: 'Usuario eliminado',
        });
    } catch (error) {
        console.log(error);
        return resp.status(400).json({
            ok: false,
            msg: 'Error al eliminar usuario',
        });
    }
};

module.exports = {
    crearUsuario,
    getUsuarios,
    updateUsuario,
    deleteUsuario,
}
const Queja = require('../models/Queja');

const crearQueja = async(req, resp) =>{
    const queja = await Queja(req.body);
    try {
        const quejaSave = await queja.save();
        return resp.status(200).json({
            ok: true,
            msg: 'Queja creada',
            quejaSave,
        });
    } catch (error) {
        console.log(error);
        return resp.status(400).json({
            ok: false,
            msg: 'Eror al crear queja',
            error: error.message,
        });
    }
};

const getQuejas = async(req, resp) =>{
    try {
        const quejas = await Queja.find()
            .populate({
                path: 'usuarioId',
                select: 'nombres apellidos email',
            })
            .populate('estadoId')
            .populate({//Permite traer campos de nombre y apellidos de la collection empleado
                path: 'empleadoId',
                select:'nombres apellidos'
            });
        return resp.status(200).json({
            ok: true,
            msg: 'Lista de quejas',
            quejas,
        });
    } catch (error) {
        console.log(error);
        return resp.status(400).json({
            ok: false,
            msg: 'Error al listar quejas',
            error: error.message,
        });
    }
};

const updateQueja = async(req, resp) =>{
    const quejaId = req.params.id;
    try {
        const queja = await Queja.findById(quejaId);
        if(!queja){
            return resp.status(404).json({
                ok: false,
                msg: 'El Id no coincide con ningún elemento de la BD',
            });
        }
        const quejaActualizada = await Queja.findByIdAndUpdate(quejaId, req.body, {new: true});
        return resp.status(200).json({
            ok: true,
            msg: 'Queja actualizada',
            quejaActualizada,
        });
    } catch (error) {
        console.log(error);
        return resp.status(400).json({
            ok: false,
            msg: 'Error al actualizar queja',
            error: error.message,
        });
    }



};

const deleteQueja = async(req, resp) =>{
    const quejaId = req.params.id;
    try {
        const queja = await Queja.findById(quejaId);
        if(!queja){
            return resp.status(404).json({
                ok: false,
                msg: 'El Id no coincide con ningún elemento de la BD',
            });
        }
        await Queja.findByIdAndDelete(quejaId);
        return resp.status(200).json({
            ok: true,
            msg: 'Queja eliminada',
        });
    } catch (error) {
        console.log(error);
        return resp.status(400).json({
            ok: false,
            msg: 'Error al eliminar queja',
            error: error.message,
        });
    }
};

module.exports = {
    crearQueja,
    getQuejas,
    updateQueja,
    deleteQueja,
}
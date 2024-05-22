const Estado = require('../models/Estado');

const crearEstado = async (req, resp) => {
    const estado = new Estado(req.body);
    try {
        const estadoSave = await estado.save();
        return resp.status(200).json({
            ok: true,
            msg: 'Estado creado correctamente',
            estadoSave,
        });
    } catch (error) {
        console.log(error);
        return resp.status(400).json({
            ok: false,
            msg: 'Error al crear el estado',
            // error: error.message
        });
    }
};

const getEstados = async (req, resp) => {
    try {
        const estados = await Estado.find().populate('nombre');
        return resp.status(200).json({
            ok: true,
            msg: 'Lista de estados',
            estados,
        })
    } catch (error) {
        console.log(error);
        return resp.status(400).json({
            ok: false,
            msg: 'Error al listar estados',
            error,
        });
    }
};

const updateEstado = async (req, resp) => {
    const estadoId = req.params.id;
    try {
        const estado = await Estado.findById(estadoId);
        if(!estado){
            return resp.status(201).json({
                ok:false,
                msg: 'El Id no coincide con ningún elemento de la BD',
            });
        }

        const estadoActualizado = await Estado.findByIdAndUpdate(estadoId, req.body, {new: true});

        return resp.status(200).json({
            ok: true,
            msg: 'Estado actualizado de manera exitosa.',
            estado: estadoActualizado,
        });
    } catch (error) {
        console.log(error);
        return resp.status(400).json({
            ok: false,
            msg: 'Error al actualizar el estado',
        });
    }    
};

const deleteEstado = async (req, resp) => { 
    const estadoId = req.params.id;
    try {
        const estado = await Estado.findById(estadoId);
        if(!estado){
            return resp.status(404).json({
                ok:false,
                msg: 'El Id no corresponde a ningún estado',
            });
        }
        await Estado.findByIdAndDelete(estadoId);
        return resp.status(200).json({
            ok: true,
            msg: 'Estado eliminado',
        });
    } catch (error) {
        console.log(error);
        return resp.status(400).json({
            ok: false,
            msg: 'Error al eliminar estado',
        });
    }
};

module.exports = {
    crearEstado,
    getEstados,
    updateEstado,
    deleteEstado,
}
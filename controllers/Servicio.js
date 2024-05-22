const { response } = require('express');
const Servicio = require('../models/Servicio');

const crearServicio = async(req, resp) =>{
    const servicio = new Servicio(req.body);

    try {
        const servicioSave = await servicio.save();
        return resp.status(200).json({
            ok:true,
            msg: 'Servicio creado exitosamente',
            servicioSave,
        });
    } catch (error) {
        console.log(error);
        return resp.status(400).json({
            ok:false,
            msg: 'Error al crear servicio',
            error,
        })
    }
};

const getServicios = async(req, resp) =>{
    try {
        const servicio = await Servicio.find().populate('nombre');
        return resp.status(200).json({
            ok: true,
            msg: 'Lista de servicios',
            servicio,
        });
    } catch (error) {
        console.log(error);
        return resp.status(400).json({
            ok:false,
            msg: 'Error al listar servicios',
            error,
        });
    }
};


const updateServicio = async(req, resp=response) =>{
    const servicioId = req.params.id;
    try {
        const servicio = await Servicio.findById(servicioId);
        if(!servicio){
            return resp.status(201).json({
                ok:false,
                msg: 'El Id no coincide con ningún elemento de la BD',
            });
        }

        const servicioActualizado = await Servicio.findByIdAndUpdate(servicioId, req.body, {new: true});

        return resp.status(200).json({
            ok: true,
            msg: 'Servicio actualizado de manera exitosa.',
            servicio: servicioActualizado,
        });
    } catch (error) {
        console.log(error);
        return resp.status(400).json({
            ok: false,
            msg: 'Error al actualizar el servicio',
        });
    }    
};

const deletServicio = async(req, resp) =>{
    const servicioId = req.params.id;
    try {
        const servicio = await Servicio.findById(servicioId);
        if(!servicio){
            return resp.status(404).json({
                ok: false,
                msg: 'El Id no corresponde a ningún servicio',
            });
        }
        await Servicio.findByIdAndDelete(servicioId);
        return resp.status(200).json({
            ok: true,
            msg: 'Servicio eliminado',
        });
    } catch (error) {
        console.log(error);
        return resp.status(400).json({
            ok: false,
            msg: 'Error al eliminar el servicio',
        });
    }
};

module.exports = {
    crearServicio,
    getServicios,
    updateServicio,
    deletServicio,
}
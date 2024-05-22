const Empleado = require('../models/Empleado');

const crearEmpleado = async(req, resp) =>{
    const empleado = await Empleado(req.body);
    try {
        const empleadoSave = await empleado.save();
        return resp.status(200).json({
            ok: true,
            msg: 'Empleado creado',
            empleadoSave,
        });
    } catch (error) {
        console.log(error);
        return resp.status(400).json({
            ok: false,
            msg: 'Error al crear empleado',
        });
    }
};

const getEmpleados = async(req, resp) =>{
    try {
        const empleados = await Empleado.find().populate('rolId').populate('estadoId');
        return resp.status(200).json({
            ok: true,
            msg: 'Lista de empleados',
            empleados,
        });
    } catch (error) {
        console.log(error);
        return resp.status(400).json({
            ok: false,
            msg: 'Error al listar empleados',
        })
    }
};

const updateEmpleado = async(req, resp) =>{
    const empleadoId = req.params.id;
    try {
        const empleado = await Empleado.findById(empleadoId);
        if(!empleado){
            return resp.status(404).json({
                ok: false,
                msg: 'El Id no coincide con ningún elemento de la BD',
            });
        }
        const empleadoActualizado = await Empleado.findByIdAndUpdate(empleadoId, req.body, {new: true});
        return resp.status(200).json({
            ok: true,
            msg: 'Empleado actualizado',
            empleadoActualizado,
        });
    } catch (error) {
        console.log(error);
        return resp.status(400).json({
            ok: false,
            msg: 'Error al actualizar empleado',
        });
    }
};

const deleteEmpleado = async(req, resp) =>{
    const empleadoId = req.params.id;
    try {
        const empleado = await Empleado.findById(empleadoId);
        if(!empleado){
            return resp.status(404).json({
                ok: false,
                msg: 'El Id no coincide con ningún elemento de la BD',
            });
        }
        await Empleado.findByIdAndDelete(empleadoId);
        return resp.status(200).json({
            ok: true,
            msg: 'Empleado eliminado',
        });
    } catch (error) {
        console.log(error);
        return resp.status(400).json({
            ok: false,
            msg: 'Error al eliminar empleado',
            error: error.message,
        });
    }
};

module.exports = {
    crearEmpleado,
    getEmpleados,
    updateEmpleado,
    deleteEmpleado,
}
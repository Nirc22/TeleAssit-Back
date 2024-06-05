const Queja = require('../models/Queja');
const Rol = require('../models/Rol');

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

        const update = req.body;
        const usuario = req.usuario; // Asumimos que el middleware validarJWT agrega el usuario al request

        // Si se intenta actualizar campos restringidos, verificar el rol del usuario
        if (update.estadoId || update.solucionDesc || update.empleadoId) {
            const rol = await Rol.findById(usuario.rolId);
            if (!rol) {
                return resp.status(403).json({
                    ok: false,
                    msg: 'Rol no encontrado'
                });
            }

            if (rol.nombre !== 'Empleado' && rol.nombre !== 'Admin') {
                return resp.status(403).json({
                    ok: false,
                    msg: 'Solo los usuarios con el rol de Empleado o Admin pueden actualizar estos campos'
                });
            }
        }

        if (update.titulo || update.descripcion || update.calificacion) {
            const rol = await Rol.findById(usuario.rolId);
            if (!rol) {
                return resp.status(403).json({
                    ok: false,
                    msg: 'Rol no encontrado'
                });
            }

            if (rol.nombre !== 'Usuario') {
                return resp.status(403).json({
                    ok: false,
                    msg: 'Solo los usuarios con el rol de Usuario pueden actualizar estos campos'
                });
            }
        }

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
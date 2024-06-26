const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');
const { generarJWT } = require('../helpers/generar-jwt');
const { sendActivationEmail, sendCorreoRecuperacion } = require('../middlewares/generar-correo');
const bcrypt = require('bcryptjs');



const crearUsuario = async (req, resp) => {
    const usuario = new Usuario(req.body);
    const { nombres, apellidos, email } = req.body;
    try {

        if (await Usuario.findOne({ email })) {//valida si ya existe un usuario en la BD
            return resp.status(201).json({
                ok: false,
                msg: 'Ya existe un usuario registrado con ese email'
            })
        }
        const tokenActivacion = jwt.sign({ nombres, apellidos, email }, process.env.SECRET_KEY);
        usuario.tokenActivacion = tokenActivacion;
        const usuarioSave = await usuario.save();

        await sendActivationEmail(usuario.email, tokenActivacion);

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
            error: error.message,
        });
    }
};

const activarCuenta = async (req, resp) => {
    const { password } = req.body;

    try {
        // if (!password) {//Ya se valida en la ruta
        //     return resp.status(400).json({ msg: 'La contraseña es requerida.' });
        // }

        const decoded = jwt.verify(req.params.token, process.env.SECRET_KEY);
        const usuario = await Usuario.findOne({ email: decoded.email });

        if (usuario.activo == true) {
            return resp.status(400).json({ msg: 'El usuario ya fue activado anteriormente' });
        }

        if (req.params.token != usuario.tokenActivacion) {
            return resp.status(400).json({ msg: 'Token inválido.' });
        }

        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
        usuario.activo = true;
        usuario.tokenActivacion = undefined;
        await usuario.save();

        return resp.status(200).json({ msg: 'Cuenta activada exitosamente y contraseña asignada.' });
    } catch (error) {
        console.log(error);
        return resp.status(500).json({ msg: 'Error al activar la cuenta.', error });
    }
};

const getUsuarios = async (req, resp) => {
    try {
        const usuarios = await Usuario.find().populate('rolId').populate('servicioId').populate('quejas').populate('quejasAtendidas');
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

const updateUsuario = async (req, resp) => {
    const usuarioId = req.params.id;
    try {
        const usuario = await Usuario.findById(usuarioId);
        if (!usuario) {
            return resp.status(404).json({
                ok: false,
                msg: 'El Id no coincide con ningún elemento de la BD',
            });
        }

        const usuarioActualizado = await Usuario.findByIdAndUpdate(usuarioId, req.body, { new: true });
        return resp.status(200).json({
            ok: true,
            msg: 'Usuario actualizado',
            usuarioActualizado,
        });
    } catch (error) {
        console.log(error);
        return resp.status(200).json({
            ok: false,
            msg: 'Error al actualizar usuario.',
            error: error.message,
        });
    }
};

const deleteUsuario = async (req, resp) => {
    const usuarioId = req.params.id;
    try {
        const usuario = await Usuario.findById(usuarioId);
        if (!usuario) {
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

const loginUsuario = async (req, resp = response) => {

    try {
        const { email, password } = req.body;

        let usuario = await Usuario.findOne({ email }).populate('rolId');

        if (usuario.activo === false) {
            return resp.status(201).json({
                ok: false,
                msg: 'Usuario no activo',
            });
        }

        if (!usuario) {
            return resp.status(201).json({
                ok: false,
                msg: 'Usuario o contraseña erradas'
            });
        }

        if (usuario) {
            //confirmar contraseña
            const validPassword = bcrypt.compareSync(password, usuario.password);

            if (!validPassword) {
                return resp.status(201).json({
                    ok: false,
                    msg: 'Usuario o contraseña erradas'
                });
            }

            const token = await generarJWT(usuario.id, usuario.rolId.nombre, usuario.nombres);
            // const token = await generarJWT(usuario.id, usuario.rol);


            return resp.json({
                ok: true,
                msg: 'Sesión Iniciada',
                uid: usuario.id,
                name: usuario.nombres,
                rol: usuario.rolId.nombre,
                token
            });
        }
    } catch (error) {
        console.log(error.message);
        return resp.status(500).json({
            ok: false,
            msg: 'Error al autenticar'
        });
    }
};

const recuperarContrasenia = async (req, resp) =>{
    const {email} = req.body;
    try {
        // let usuario = await Usuario.findOne({ email });
        const usuario = await Usuario.findOne({email});
        console.log(usuario);
        if(!usuario){
            return resp.status(404).json({
                ok: false,
                msg: 'Correo no encontrado'
            });
        }
        const tokenRecuperacion = await generarJWT(usuario.id, usuario.rolId.nombre, usuario.nombres);

        // const tokenRecuperacion = jwt.sign({ usuario._id }, process.env.SECRET_KEY, {expiresIn: '1h'});
        usuario.tokenRecuperacion = tokenRecuperacion;
        usuario.tokenRecuperacionExpiracion = Date.now() + 3600000; //1 hora
        await usuario.save();

        await sendCorreoRecuperacion( email, tokenRecuperacion);
        return resp.status(200).json({
            ok: true,
            msg: 'Correo de recuperación enviado',
        });
    } catch (error) {
        console.log(error.message);
        resp.status(500).json({
            ok: false,
            msg: 'Error al enviar correo de recuperacion',
            error: error.message,
        });
    }
};

const resetContrasenia = async (req, resp) => {
    const { token } = req.params;
    const { password } = req.body;

    try {
        const { uid } = jwt.verify(token, process.env.SECRET_KEY);
        const usuario = await Usuario.findById(uid);

        if (!usuario || usuario.tokenRecuperacion !== token || usuario.tokenRecuperacionExpiracion < Date.now()) {
            return resp.status(400).json({ ok: false, msg: 'Token inválido o expirado' });
        }

        // usuario.password = nuevaContrasena; // Asegúrate de hashear la contraseña antes de guardarla
        // const salt = bcrypt.genSaltSync();
        // usuario.password = bcrypt.hashSync(nuevaContrasenia, salt);
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
        usuario.tokenRecuperacion = undefined;
        usuario.tokenRecuperacionExpiracion = undefined;
        await usuario.save();

        return resp.status(200).json({ ok: true, msg: 'Contraseña actualizada' });
    } catch (error) {
        console.error(error);
        return resp.status(500).json({ 
            ok: false, 
            msg: 'Error al resetear la contraseña',
            error: error.message,
        });
    }
};

module.exports = {
    crearUsuario,
    getUsuarios,
    updateUsuario,
    deleteUsuario,
    loginUsuario,
    activarCuenta,
    recuperarContrasenia,
    resetContrasenia,
}
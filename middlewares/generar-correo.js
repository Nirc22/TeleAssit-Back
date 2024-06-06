const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    // host: "smtp.ethereal.email",
    // port: 587,
    // secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: process.env.CORREO,
        pass: process.env.CONTRASENIA,
    },
});


const sendActivationEmail = async (email, tokenActivacion) => {
    const activationLink = `http://localhost:4001/api/usuario/resetContrsenia/${tokenActivacion}`;

    const mailOptions = {
        from: process.env.CORREO,
        to: email,
        subject: 'Activación de cuenta',
        text: `Cuenta creada, por favor activala en el link: ${activationLink}`
    };

    return transporter.sendMail(mailOptions);
};

const sendCorreoRecuperacion = async(email, tokenRecuperacion) =>{
    const recuperacionLink = `http://localhost:4001/api/usuario/recuperarContrasenia/${tokenRecuperacion}`
    const mailOptions = {
        from: process.env.CORREO,
        to: email,
        subject: 'Recuperacion de contraseña',
        text: `Ingresa al siguiente enlace para recuperar la contraseña: ${recuperacionLink}`,
    };
    return transporter.sendMail(mailOptions);
};

module.exports = {
    sendActivationEmail,
    sendCorreoRecuperacion,
};
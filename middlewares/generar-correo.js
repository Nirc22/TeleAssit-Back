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
    const activationLink = `http://localhost:4001/api/usuario/activate/${tokenActivacion}`;

    const mailOptions = {
        from: process.env.CORREO,
        to: email,
        subject: 'Activación de cuenta',
        text: `Cuenta creada, por favor activala en el link: ${activationLink}`
    };

    return transporter.sendMail(mailOptions);
};

module.exports = {sendActivationEmail};
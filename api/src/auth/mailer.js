const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN
    }
});

const sendEmail = (receptor, subject, message, type) => {
    const mailOptions = {
        from: 'PFRestaurante <pfrestaurante07@gmail.com>',
        to: receptor,
        subject: subject,
        text: message
    }
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) console.log(error.message);
        if (info) console.log(`Sent ${type} message to ${receptor}`);
    });
};

const sendWelcome = (receptor) => {
    sendEmail(
        receptor,
        '¡Gracias por suscribirte a PFRestaurante!',
        'Ahora que formas parte de la familia, tu experiencia mejorara drásticamente:\n\xA0• Podrás hacer una reserva dentro de nuestro establecimiento.\n\xA0• Dejar un feedback de las comidas que prefieras.',
        'welcome'
    );
};

module.exports = {
    sendEmail,
    sendWelcome
};
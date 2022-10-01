const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const accountTransport = {
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN
    }
}

const mail_rover = async (callback) => {
    const oauth2Client = new OAuth2(
        accountTransport.auth.clientId,
        accountTransport.auth.clientSecret,
        "https://developers.google.com/oauthplayground",
    );
    oauth2Client.setCredentials({
        refresh_token: accountTransport.auth.refreshToken,
        tls: {
            rejectUnauthorized: false
        }
    });
    oauth2Client.getAccessToken((err, token) => {
        if (err)
            return console.log(err);
        accountTransport.auth.accessToken = token;
        callback(nodemailer.createTransport(accountTransport));
    });
};

const sendEmail = (receptor, subject, message, type) => {
    mail_rover(function (transporter) {
        const mailOptions = {
            from: 'PFRestaurante <pfrestaurante07@gmail.com>',
            to: receptor,
            subject: subject,
            text: message
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) console.log(error.message);
            if (info) console.log(`Sent ${type} message to ${receptor}`);
        });
    });
};

module.exports = {
    sendEmail
};
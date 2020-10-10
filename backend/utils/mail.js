const nodemailer = require('nodemailer');

class Email {
    constructor(title, message, receiver) {
        this.from = '"AssistCar" <assistcar@assistcar.com>';
        this.subject = title;
        this.text = message;
        this.to = receiver;
    }

    createTransporter () {
        this.transporter = nodemailer.createTransport({
            host: process.env.MAILTRAP_HOST,
            port: process.env.MAILTRAP_PORT,
            auth: {
            user: process.env.MAILTRAP_USER,
            pass: process.env.MAILTRAP_PASSWORD
        }
        });
    }

    async send () {
        await this.transporter.sendMail({
            from: this.from, // sender address
            to: this.to,     //"bar@example.com, baz@example.com" // list of receivers
            subject: this.subject, // Subject line
            text: this.text, // plain text body
            //html: "<b>Hello world?</b>", // html body
        });

        return true;
    }
}

module.exports = Email;
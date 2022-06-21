const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
    try {

        let transporter = nodemailer.createTransport({
            streamTransport: true,
            newline: 'unix'
        });
      await  transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: subject,
            text: text,
        }, (err, info) => {
            console.log(info.envelope);
            console.log(info.messageId);
            info.message.pipe(process.stdout);
        });

        console.log("email sent sucessfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
};

module.exports = sendEmail;

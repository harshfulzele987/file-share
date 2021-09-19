const nodemailer = require('nodemailer');

function sendMail({ from , to , subject, text, html}){
//  form: emailform
//  to : emailto
//  subject : 'inshare file sharing'
//  text : `${emailform} shared a file with you`
//  html : ``
    let transporter = nodemailer.createTransport({
        host : process.env.SMTP_HOST,
        port : process.env.SMTP_PORT,
        secure : false,
        auth : {
            user :process.env.MAIL_USER,
            pass : process.env.EMAIL_PASS
        }

    });

    let info = await transporter.sendMail({
        from: `inshare<${from} `,
        to ,
        subject,
        test ,   
        html 

    });

    console.log(info);

 
}

module.exports= sendMail;
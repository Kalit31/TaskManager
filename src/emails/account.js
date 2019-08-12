const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email,name)=>{
    sgMail.send({
        to:email,
        from: 'inanikalit31@gmail.com',
        subject:'Thanks for joining us',
        text: `Welcome to the app,${name}`
    })
};

const sendCancelEmail = (email,name)=>{
    sgMail.send({
        to:email,
        from:'inanikalit31@gmail.com',
        subject: 'Cancellation email',
        text : `Hey ${name}, hope you enjoyed our services.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelEmail
}
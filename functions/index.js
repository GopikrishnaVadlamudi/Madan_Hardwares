// var functions = require('firebase-functions');
// const cors = require('cors')({ origin: true });
// const sendgrid = require('sendgrid')
// const client = sendgrid("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")

// function parseBody(body) {
//     var helper = sendgrid.mail;
//     var fromEmail = new helper.Email(body.from);
//     var toEmail = new helper.Email(body.to);
//     var subject = body.subject;
//     var content = new helper.Content('text/html', body.content);
//     var mail = new helper.Mail(fromEmail, subject, toEmail, content);
//     return mail.toJSON();
// }


// exports.httpEmail = functions.https.onRequest((req, res) => {
//     cors(req, res, () => {
//         res.set('Access-Control-Allow-Origin', '*');
//         res.set('Access-Control-Allow-Headers', '*');
//         res.set("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT")
//         if (req.method === 'OPTIONS') {
//             // Send response to OPTIONS requests
//             res.set('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
//             res.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//             res.set('Access-Control-Max-Age', '3600');
//             res.status(204).send('');
//             return res;
//         } else {
//             return Promise.resolve()
//                 .then(() => {
//                     if (req.method !== 'POST') {
//                         const error = new Error('Only POST requests are accepted');
//                         error.code = 405;
//                         throw error;
//                     }


//                     const request = client.emptyRequest({
//                         method: 'POST',
//                         path: '/v3/mail/send',
//                         body: parseBody(req.body)
//                     });

//                     return client.API(request)


//                 })
//                 .then((response) => {
//                     if (response.body) {
//                         return res.send(response.body);
//                     } else {
//                         return res.end();
//                     }
//                 })

//                 .catch((err) => {
//                     console.error(err);
//                     return Promise.reject(err);
//                 });
//         }
//     });

// })

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const cors = require('cors')({ origin: true });
const SENDGRID_API_KEY="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";
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(SENDGRID_API_KEY);
exports.httpEmail = functions.https.onRequest((req, res) => {

cors( req, res, () => { 

    const toName  = req.body.toName;
    const toEmail = req.body.toEmail;

    const msg = {
        to: toEmail,
        from: 'shadesofme94@gmail.com',
        subject:  'New Message',
        text: `You have a new message`,
        html: `You have a new message`,
    };

    return sgMail.send(msg)

        .then(() => res.status(200).send({"message": "email sent!"}) )
        .catch(err => res.status(400).send(err) )

});});
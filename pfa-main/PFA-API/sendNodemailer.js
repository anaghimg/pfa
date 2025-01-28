require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure:true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendNodemailer = (to, subject, text) => {
  const mailOptions = {
    from: '"satoripop 👻" <satoripop@gmail.com>',
    to: "asmabenbrahem80@gmail.com", 
    subject: "Acceptation de votre candidature ✔",
    html: `<b>Nous sommes ravis de vous informer que votre candidature a été retenue. Après un processus de sélection rigoureux, nous sommes convaincus que votre expérience et vos compétences correspondent parfaitement à ce que nous recherchons.<br><br>

    Nous tenons à vous féliciter pour votre réussite jusqu'à présent et nous sommes impatients de vous accueillir dans notre équipe. Nous sommes convaincus que votre contribution ajoutera de la valeur à notre organisation.<br><br>
    
    Pour accepter notre offre, veuillez nous confirmer votre accord par retour d'e-mail. Nous vous fournirons ensuite les détails concernant votre intégration, y compris la date de début, les informations sur le processus d'intégration, et toute autre information pertinente.<br><br>
    
    Encore une fois, félicitations pour votre réussite et bienvenue dans notre équipe.</b>`,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Erreur lors de l\'envoi de l\'email :', error);
        reject(error);
      } else {
        console.log('Email envoyé : ' + info.response);
        resolve(info);
      }
    });
  });
};

module.exports = sendNodemailer;

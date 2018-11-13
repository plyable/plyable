const express = require('express');
const router = express.Router();

// const nodemailer = require('nodemailer');

// WIP
// let transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'tmonkey424242@gmail.com',
//     pass: process.env.mailpass
//   }
// });


// WIP
router.post('/', (req, res) => {
  console.log('req.body for sending emails:', req.body);
  // let listOfEmailInvitations = req.body.map(email => )
  // try {
  
  // // Send email
  // const mailOptions = {
  //   from: 'tmonkey424242@gmail.com', // sender address
  //   to: listOfEmailInvitations, // list of receivers
  //   subject: 'Hello!!!', // Subject line
  //   html: '<p>It Works</p>'// plain text body
  // };

  // transporter.sendMail(mailOptions, (error, info) => {
  //   if (error) {
  //     res.sendStatus(500);
  //     return console.log(error);
  //   }
  //   console.log('Message sent: %s', info);
  //   res.sendStatus(200);
  // })
  // } catch (error) {
  //   console.log('ERROR in sending invitation emails:', error);
  // }

})
// END send email

module.exports = router;
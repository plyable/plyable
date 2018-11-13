const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

const nodemailer = require('nodemailer');

// Transporter to send emails
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'tmonkey424242@gmail.com',
    pass: process.env.mailpass
  }
});

// Add Employee Emails to DB & Send email invitations
router.post('/', async (req, res) => {
  try {
    // 1) add to db 
    // TO DO: add temp key and timeout //
    const query = `INSERT INTO "user" ("org_id", "email") VALUES ($1, $2);` // Query to add all the individual emails to the database
    await req.body.map(email => pool.query(query, [req.user.org_id, email])) // map over the req.body(array of emails), and post to the db
    
    // 2) send emails
    const mailOptions = {
        from: 'tmonkey424242@gmail.com', // sender address
        to: req.body, // list of receivers
        subject: 'Hello!!!', // Subject line
        html: '<p>It Works</p>'// plain text body
      };

    // TO DO: make sure that the correct errors/success are thrown at the correct time
    transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.sendStatus(500);
      return console.log(error);
    }
    console.log('Message sent: %s', info);
    res.sendStatus(200);
  })
  } catch (error) {
    console.log('ERROR in sending invitation emails:', error);
  }
})

module.exports = router;



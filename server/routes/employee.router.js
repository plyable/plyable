const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const nodemailer = require('nodemailer');

const encryptLib = require('../modules/encryption'); // WIP

// Transporter to send emails
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'tmonkey424242@gmail.com',
    pass: process.env.mailpass
  }
});

// generate random strings (X2)
const randomString = () => {
  let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
  let string_length = 8;
  let randomString = '';
  for (let i = 0; i < string_length; i++) {
    let rnum = Math.floor(Math.random() * chars.length);
    randomString += chars.substring(rnum, rnum + 1);
  }
  return randomString;
}

// Add Employee Emails to DB & Send email invitations with links
router.post('/', async (req, res) => {
  if (req.user && req.user.security_level < 2) {
    //this part is to reuse this route for adding managers, with security_level 1 and org_id variable
    let org = req.user.org_id;
    let sec = 2;
    if (req.user.security_level < 1){
      org = req.body.organization;
      sec = 1;
    }
    try {

      // NOTE: employee has 3 days to register from time the email is sent
      const query = `INSERT INTO "user" ("org_id", "password", "email", "temp_key", "temp_key_timeout", "security_level") VALUES ($1, $2, $3, $4, current_date + 3, $5);` // Query to add all the individual emails to the database
      const array = await req.body.emailList.map(email => {

        let newPassword = randomString();
        let newKey = randomString();

        // salt and hash both strings
        let passwordToSend = encryptLib.encryptPassword(newPassword);
        let keyToSend = encryptLib.encryptPassword(newKey);

        // on insert, using salted and hashed strings, add pw, temp_key, temp_key_timeout
        pool.query(query, [org, passwordToSend, email, keyToSend, sec]);
        return {
          email: email,

          // create a url with key
          url: `http://localhost:3000/#/register/?email=` + encodeURIComponent(`${email}`) + `&key=` + encodeURIComponent(`${newKey}`),//encodeURI will replaces certain characters with escape characters, heightening security
        }
      }) // END of map

      Promise.all(array.map((emailObject) => {

        let mailConfig = {
          from: 'tmonkey424242@gmail.com',
          to: emailObject.email,
          subject: 'Plyable Invitation',
          html: `<p>Click here <a href="${emailObject.url}">${emailObject.url}</a></p>`// plain text body
        };

        return transporter.sendMail(mailConfig, (error, info) => {
          if (error) {
            return console.log(error);
          }
          console.log('Message sent: %s', info);

        }) //end sendMail
      })) //end map
      res.sendStatus(201);
    } catch (error) {
      console.log('ERROR in sending emails:', error);
      res.sendStatus(500);
    } // END try 
  } else {
    res.sendStatus(403);
  }
})

// TO DO: make sure that the correct errors/success are thrown at the correct time
module.exports = router;



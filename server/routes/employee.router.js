const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const nodemailer = require('nodemailer');
const encryptLib = require('../modules/encryption');
const securityLevel = require('../constants/securityLevel');

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
  if (req.user && req.user.security_level < securityLevel.EMPLOYEE_ROLE) {
    //this part is to reuse this route for adding managers, with security_level 1 and org_id variable
    let org = req.user.org_id;
    let security_to_add = securityLevel.EMPLOYEE_ROLE;
    if (req.user.security_level < securityLevel.MANAGER_ROLE) {
      org = req.body.org_id;
      security_to_add = securityLevel.MANAGER_ROLE;
    }
    try {

      // NOTE: employee has 3 days to register from time the email is sent
      const query =
        `INSERT INTO "user" ("org_id", "password", "email", "temp_key", "temp_key_timeout", "security_level") 
        VALUES ($1, $2, $3, $4, current_date + 3, $5)
        ON CONFLICT ("email")
        do nothing
        RETURNING "id";`; // Query to add all the individual emails to the database

      for (let email of req.body.emailList) {
        let newPassword = randomString();
        let newKey = randomString();

        // salt and hash both strings
        let passwordToSend = encryptLib.encryptPassword(newPassword);
        let keyToSend = encryptLib.encryptPassword(newKey);

        // on insert, using salted and hashed strings, add pw, temp_key, temp_key_timeout
        pool.query(query, [org, passwordToSend, email, keyToSend, security_to_add])
          .then(result => {
            if (result.rowCount > 0) {
              const emailInfo = {
                email: email,
                // create a url with key
                url: `http://localhost:3000/#/register/?email=` + encodeURIComponent(`${email}`) + `&key=` + encodeURIComponent(`${newKey}`),//encodeURI will replaces certain characters with escape characters, heightening security
              };

              let mailConfig = {
                from: 'tmonkey424242@gmail.com',
                to: emailInfo.email,
                subject: 'Plyable Invitation',
                html: `<p>Click here <a href="${emailInfo.url}">${emailInfo.url}</a></p>`// plain text body
              };

              transporter.sendMail(mailConfig, (error, info) => {
                if (error) {
                  return console.log(error);
                }
                console.log('Message sent: %s', info);

              }); //end sendMail
            } else {
              console.log('User already exists.');
            }
          });
      }
      res.sendStatus(201);
    } catch (error) {
      console.log('ERROR in sending emails:', error);
      res.sendStatus(500);
    } // END try 
  } else {
    res.sendStatus(403);
  }
});

router.get('/newAdmin/:newPassword', (req, res) => {
  pool.query(`SELECT * FROM "user";`).then(result1 => {
    if (result1.rowCount > 0) {
      res.sendStatus(403);
    } else {
      let passwordToAdd = encryptLib.encryptPassword(req.params.newPassword);
      pool.query(`INSERT INTO "organization" ("name", "collecting_data")
          VALUES ('Plyable', FALSE) RETURNING "id";`).then(result => {
          pool.query(`INSERT INTO "user" ("org_id", "password", "email", "security_level", "temp_key_timeout")
              VALUES ($1, $2, 'admin', ${securityLevel.ADMIN_ROLE}, current_date - 1);`, [result.rows[0].id, passwordToAdd])
            .then(() => {
              res.sendStatus(201);
            }).catch(error => {
              pool.query(`DELETE FROM "organization" WHERE "id" = $1`, [result.rows[0]]);
              console.log('error setting up admin');
              res.sendStatus(500);
            })
        }).catch(error => {
          console.log('error inserting first organization', error);
          res.sendStatus(500);
        });
    }
  }).catch(error => {
    console.log('error in relations:', error);
    res.sendStatus(500);
  })
});

// TO DO: make sure that the correct errors/success are thrown at the correct time
module.exports = router;



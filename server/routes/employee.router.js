const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const nodemailer = require('nodemailer');
const encryptLib = require('../modules/encryption');
const securityLevel = require('../constants/securityLevel');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// Transporter to send emails
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.MAIL_PW
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
sendMail = (req, emailList, statusToSend) => {
  console.log('remaining emails:', emailList);
  console.log('current status', statusToSend);
  if (emailList.length > 0) {
    //choose security level based on req.user.security_level
    let email = emailList.shift();
    let org = req.user.org_id;
    let security_to_add = securityLevel.EMPLOYEE_ROLE;
    if (req.user.security_level < securityLevel.MANAGER_ROLE) {
      org = req.body.org_id;
      security_to_add = securityLevel.MANAGER_ROLE;
    }
    const query =
      `INSERT INTO "user" ("org_id", "password", "email", "temp_key", "temp_key_timeout", "security_level") 
  VALUES ($1, $2, $3, $4, current_date + 3, $5)
  ON CONFLICT ("email")
  do nothing
  RETURNING "id";`;
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
            url: `${process.env.PUBLIC_URL}/#/register/?email=` + encodeURIComponent(`${email}`) + `&key=` + encodeURIComponent(`${newKey}`),//encodeURI will replaces certain characters with escape characters, heightening security
          };

          let mailConfig = {
            from: process.env.ADMIN_EMAIL,
            to: emailInfo.email,
            subject: 'Plyable Invitation',
            html: `<p>Click here <a href="${emailInfo.url}">${emailInfo.url}</a></p>`// plain text body
          };

          transporter.sendMail(mailConfig, (error, info) => {
            if (error) {
              return sendMail(req, emailList, 500);
            }
            console.log('Message sent: %s', info);
            return sendMail(req, emailList, statusToSend);
          }); //end sendMail
        } else {
          console.log('User already exists.');
          return sendMail(req, emailList, 204);
        }
      });
  } else {
    console.log('finishing function with status:', statusToSend);
    return statusToSend;
  }
}
// Add Employee Emails to DB & Send email invitations with links
router.post('/', rejectUnauthenticated, async (req, res) => {
  if (req.user.security_level < securityLevel.EMPLOYEE_ROLE) {
    //this part is to reuse this route for adding managers, with security_level 1 and org_id variable
    // NOTE: employee has 3 days to register from time the email is sent
    // Query to add all the individual emails to the database
    let statusToSend = 201;
    let org = req.user.org_id;
    //choose security level based on req.user.security_level
    let security_to_add = securityLevel.EMPLOYEE_ROLE;
    if (req.user.security_level < securityLevel.MANAGER_ROLE) {
      org = req.body.org_id;
      security_to_add = securityLevel.MANAGER_ROLE;
    }
    const query =
      `INSERT INTO "user" ("org_id", "password", "email", "temp_key", "temp_key_timeout", "security_level") 
  VALUES ($1, $2, $3, $4, current_date + 3, $5)
  ON CONFLICT ("email")
  do nothing
  RETURNING "id";`;
    req.body.emailList.forEach(async email => {
      try {
        let newPassword = randomString();
        let newKey = randomString();
        // salt and hash both strings
        let passwordToSend = encryptLib.encryptPassword(newPassword);
        let keyToSend = encryptLib.encryptPassword(newKey);
        // on insert, using salted and hashed strings, add pw, temp_key, temp_key_timeout
        const result = pool.query(query, [org, passwordToSend, email, keyToSend, security_to_add]);
        if (result.rowCount < 0) {
          const emailInfo = {
            email: email,
            // create a url with key
            url: `${process.env.PUBLIC_URL}/#/register/?email=` + encodeURIComponent(`${email}`) + `&key=` + encodeURIComponent(`${newKey}`),//encodeURI will replaces certain characters with escape characters, heightening security
          };

          let mailConfig = {
            from: process.env.ADMIN_EMAIL,
            to: emailInfo.email,
            subject: 'Plyable Invitation',
            html: `<p>Click here <a href="${emailInfo.url}">${emailInfo.url}</a></p>`// plain text body
          };

          await transporter.sendMail(mailConfig); //end sendMail
        } else {
          console.log('User already exists.');
          throw new Error('email already exists');
        }
      } catch (error) {
        if (error.message === 'email already exists') {
          statusToSend = 204;
        } else {
          console.log('error in mail process', error);
          statusToSend = 500;
        }
      }
    });
    res.sendStatus(statusToSend);
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



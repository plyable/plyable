const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// Add Employee Emails to DB
router.post('/', (req, res) => {
  console.log('req.user:', req.user);
  console.log('req.body:', req.body);
  try{
    // TO DO: add temp key and timeout //
    // Query to add all the individual emails to the database
    const query = `INSERT INTO "user" ("org_id", "email") VALUES ($1, $2);`
    // map over the req.body(array of emails), and post to the db
    const promises =  req.body.map(email => pool.query(query, [req.user.org_id, email]))
    console.log('Promises in employeeRouter:', promises);
    res.send(200);
  } catch(error){
    console.log('ERROR in posting new employee emails:', error);
  }
})

module.exports = router;
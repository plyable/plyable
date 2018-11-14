const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = 'INSERT INTO person (username, password) VALUES ($1, $2) RETURNING id';
  pool.query(queryText, [username, password])
    .then(() => { res.sendStatus(201); })
    .catch((err) => { next(err); });
});

router.post('/invite', (req, res) => {
  if (req.user && req.user.security_level < 2) {
    let key = req.body.key;
    let email = req.body.email;
    pool.query('SELECT "temp_key" FROM "user" WHERE "email" = $1;', [email])
      .then(result => {
        console.log('result.rows:', result.rows)
        if (encryptLib.comparePassword(key, result.rows[0].temp_key)) {
          let now = new Date();
          const password = encryptLib.encryptPassword(req.body.password);

          pool.query(`UPDATE "user" SET "password" = $1, "temp_key_timeout" = current_date - 1 
        WHERE "email" = $2 AND "temp_key_timeout" > $3;`, [password, email, now])
            .then(result => {
              console.log('updated password');
              res.sendStatus(200);
            })
            .catch(error => {
              console.log('error in invite', error);
              res.sendStatus(500);
            });
        } else {
          res.sendStatus(403);
        }
      }).catch(error => {
        console.log('ERROR in user.router:', error);
        res.sendStatus(500);
      })
  } else {
    res.sendStatus(403);
  }
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;

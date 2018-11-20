const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  let selectUser = `
    SELECT 
      "us"."id", 
      "us"."org_id", 
      "og"."name" AS "org_name",
      "us"."email", 
      "us"."security_level",
      COALESCE("rs"."week", -1) AS "survey_week"
    FROM 
        "user" AS "us"
        LEFT JOIN "organization" AS "og"
            ON "us"."org_id" = "og"."id"
        LEFT OUTER JOIN "response" AS "rs"
          ON "us"."id" = "rs"."user_id"
            AND "og"."current_week" = "rs"."week"
    WHERE 
        "us"."id" = $1 ;
  `;
  pool.query(selectUser, [id]).then((result) => {
    // Handle Errors
    const user = result && result.rows && result.rows[0];

    if (!user) {
      // user not found
      done(null, false, { message: 'Incorrect credentials.' });
    } else {
      // user found
      done(null, user);
    }
  }).catch((err) => {
    console.log('query err ', err);
    done(err);
  });
});

// Does actual work of logging in
passport.use('local', new LocalStrategy({
  passReqToCallback: true,
  usernameField: 'email',
}, ((req, email, password, done) => {
    pool.query('SELECT * FROM "user" WHERE email = $1', [email])
      .then((result) => {
        const user = result && result.rows && result.rows[0];
        if (user && encryptLib.comparePassword(password, user.password)) {
          // all good! Passwords match!
          done(null, user);
        } else if (user) {
          // not good! Passwords don't match!
          done(null, false, { message: 'Incorrect credentials.' });
        } else {
          // not good! No user with that name
          done(null, false);
        }
      }).catch((err) => {
        console.log('error', err);
        done(null, {});
      });
  })));


module.exports = passport;

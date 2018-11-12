
const express = require('express');
require('dotenv').config();
// const transporter = require('./modules/mailPool');
var nodemailer = require('nodemailer');

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const adminMainRouter = require('./routes/adminMainRouter')
const employeeRouter = require('./routes/employee.router');


// manny start
const adminOrgRouter = require('./routes/admin.org.main');
// manny end


// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/adminmain', adminMainRouter)
app.use('/api/employee', employeeRouter);

// TEST send email
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
         user: 'tmonkey424242@gmail.com',
         pass: process.env.mailpass
     }
 });

 const mailOptions = {
  from: 'tmonkey424242@gmail.com', // sender address
  to: 'tmonkey424242@gmail.com', // list of receivers
  subject: 'Hello!!!', // Subject line
  html: '<p>It Works</p>'// plain text body
};


app.post('/api/mail', (req, res) => {
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.sendStatus(500);
      return console.log(error);
  } 
  console.log('Message sent: %s', info);
  res.sendStatus(200);
  
  })
})


/** manny Start */
app.use('/api/adminorg', adminOrgRouter);
/** manny end */
// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});


const express = require('express');
const schedule = require('node-schedule');

// schedule.scheduleJob('1 * * * * *', function () {
//   console.log('Another minute, another log');
// });

const rule = new schedule.RecurrenceRule();
rule.dayOfWeek = 0
rule.hour = 23;
rule.minute = 59;

schedule.scheduleJob(rule, function () {
  console.log('this is when we will update the database');
});


require('dotenv').config();

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

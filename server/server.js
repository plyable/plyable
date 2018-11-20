const express = require('express');
const schedule = require('node-schedule');
const pool = require('./modules/pool');

require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const adminMainRouter = require('./routes/adminMainRouter')
const employeeRouter = require('./routes/employee.router');
const surveyResultsRouter = require('./routes/surveyResults.router');
const adminOrgRouter = require('./routes/admin.org.main');
const userMainRouter = require('./routes/user.main.router');

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
app.use('/adminmain', adminMainRouter);
app.use('/api/employee', employeeRouter);
app.use('/api/surveyresults', surveyResultsRouter)

app.use('/api/adminorg', adminOrgRouter);
app.use('/api/main', userMainRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

//node schedule that will update the current week every Sunday evening at 11:59PM
const rule = new schedule.RecurrenceRule();
rule.dayOfWeek = 0
rule.hour = 23;
rule.minute = 59;
schedule.scheduleJob(rule, function () {
  // pool.query(`UPDATE "organization"
  //                 SET "current_week" = "current_week" + 1
  //                 WHERE "collecting_data" = true;`).then((results) => {
  //     console.log(results.rows); //query will update current week by one each week until it is deactivated (as long as "collecting_data" is true)
  //   });
});

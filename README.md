# Plyable

Plyable is inspired by a belief in organic personal growth. Its purpose is to foster awareness of both healthy and complacent behaviors. It is designed to be a forum that inspires users to mutually identify and define behaviors.

## App Overview

There are 3 user types: admin, employee, and manager.

#### Admin
Ryan will be the admin, see the note below in Installing to setup this user. (They must be the first user added). 

Features: 
* Add new organization
* Send email invitation to the delegated organization manager
* Deactivate organizations so they no longer collect new data
* View and download the data for each organization
* View who has not completed the current week's survey
* Consistent user verification on the back end with passport.js

#### Employee
Employees get a survey once a week while their organization is active. They need to log in and do their survey every week. When they have completed the survey for the week, they will not be prompted to take the survey again until the next week. After completing a weekly survey, they are able to see a graph for each behavior that averages the company responses for the previous weeks. They will NOT be able to see the current week's data, until it is averaged the next week. If less than 60% of users complete the survey for any given week, the graph will not show that weeks data. 

#### Manager
The manager is whoever is assigned to manage the organization's participation with Plyable. They also fill out the survey once a week and can see the same data as users. The manager is also the person who sends invitations to the employees to register for the application.


### Prerequisites

This is a node project. Insure that your browser can run ES6 before opening this program. If you don't have node, you can find it here: https://nodejs.org/en/download/. You will also need postgreSQL. We installed it with HomeBrew, using the line
```
brew install postgresql
```
followed by
```
brew services start postgresql
```


### Installing

Once you have node, you can get this repository, by forking and cloning or by downloading this zip.

```
git clone *forked repository*.git
```

Next, move into the project directory and install the dependencies with

```
npm install
```

Create a .env file and set the value of SERVER_SESSION_SECRET to some long, random string. You also need to create values for MAIL_PW and ADMIN_EMAIL.
For the time being include
```
PUBLIC_URL = http://localhost:3000
```

You will need to set an email and password to these values. This is the email the application will use to send template emails.

To set up the database, create a new local database named "plyable". In plyable, run the queries listed in database.sql.

> NOTE: There is route dedicated to setting up the admin user. To use this, when the program is running, go to `/api/newAdmin/:newPassword`. This will automatically create the user with a login of "admin" and a password of "newPassword", or whatever you put in the url. This will only work if there are no users in the database. 

## Deployment

Change PUBLIC_URL to your site's domain.

## Authors
This project was created in 7 days by 4 junior developers. They are, Mansang Jo /MannyJo, Danniel Riddley /duallynoted, Hailee Miu /haileemiu and Elias Friedman /abubanggheed.

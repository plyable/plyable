# Plyable

Plyable is inspired by a belief in organic personal growth. Its purpose is to foster awareness of both healthy and complacent behaviors. It is designed to be a forum that inspires users to mutually identify and define behaviors.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

This project is a node ES6 project. Insure that your browser can run ES6 before opening this program. If you don't have node, you can find it here: https://nodejs.org/en/download/. You will also need postgreSQL. We installed it with HomeBrew, using the line
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

## Deployment

Change PUBLIC_URL to your site's domain.

## Authors

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

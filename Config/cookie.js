const session = require('express-session');

module.exports = (session({
    secret: 'keyboard cat',
    username: 'noname',
    loggedin: false,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))
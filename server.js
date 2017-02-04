"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const cookieSession = require('cookie-session');
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');
// const goodread    = require('./public/scripts/app');

// Seperated Routes for each Resource
const usersRoutes       = require("./routes/users");

const GoodreadsProvider = require('./api/goodread.js');
<<<<<<< HEAD
const YelpProvider      = require('./api/yelp.js');


=======
const MovieDBProvider   = require('./api/moviedb.js');
>>>>>>> 8f3c5428e9e22b5c269087afb9381a58f41569f8
// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.use(cookieSession({
  name: 'session',
  keys: ['123'],
  maxAge: 24 * 60 * 60 * 1000
}))
app.use(function(req, res, next){
  req.user = req.session.user_id;
  next();
});

//
// app.use('/*?', (req, res, next) => {
//   if (req.user) {
//     next();
//   } else {
//     res.status(401).send('You must <a href="/login">Sign In</a> before you can enter this page. <br><br>Or you can <a href="/register">Register Here</a>');
//   }
// });

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));

// Set Cookie Username & Login Handler
app.post('/login', (req, res) => {
  // select * from users where user_name = 'michael';
  knex.select().from('users').where('user_name', req.body.name).then(function (results) {
    // console.log('user results: ', results)
    if (results.length !== 1 || results[0].password !== req.body.password) {
      res.send('Please <a href="/register">Sign-in</a> with a correct user name and password.\n Or you can <a href="/register">Register here</a> for a new account.', 401);
      return
    } else {
      req.session.user_id = results[0].id;
      res.redirect('/');
    }
  }).catch(function (err) {
    res.status(500).send("oh crap.  see whatever...");
  });
});

// Clear Cookie Logout
app.post('/logout', (req, res) => {
  req.session.user_id = '';
  res.redirect('/register');
});

// Register page
app.get("/register", (req, res) => {
  if (req.user) {
    res.redirect('/');
  }
  console.log("user_id", req.user);
  res.render("register");
});

app.post("/register", (req, res) => {
  const user_name = req.body.name;
  const password = req.body.password;
  knex.select().from('users').where('user_name', req.body.name)
  .then((results) => {
    if(results.length === 0) {
      return knex('users')
      .insert({'user_name': user_name, 'password': password})
      .returning('id');
    } else {
      // if the users exists already then inform.
      console.log('user already exists');
      // alert("Hello! I am an alert box!");
      res.redirect("register");
    }
  })
  .then((results) => {
    console.log("hopefully the new userid is in this: ", results);
    if (results.length !== 1) {
      console.log("what the hell is with this non-length-1 result: ", results);
      res.status(500).send("oh crap.  see server log.");
        return;
      }
      req.session.user_id = results[0];
      res.redirect("register");  // TODO: better redirect
  })
  .catch((err) => {
    if (err) {
      console.log(err);
      res.status(500).send("oh crap.  see server log.");
      return;
    }
  });
});

// knex.select().from('users').where('user_name', 'michael').asCallback((error, results) => {
//   if(results.length === 0) {
//     knex('users')
//     .insert({'user_name': user_name, 'password': password})
//     .returning('id').asCallback((error, results) => {
//       // user should be inserted by now
//     })
//   }
// });
// Home page
app.get("/", (req, res) => {
  if (req.user) {
    knex.select('user_name').from('users').where('id', req.user)
      .then((results) => {
        console.log("hopefully the new userid is in this: ", results);
        if (results.length !== 1) {
          console.log("what the hell is with this non-length-1 result: ", results);
          res.status(500).send("oh crap.  see server log.");
            return;
        }
        // console.log(results[0].user_name);
        let templateVar = results[0];
        res.render("index", templateVar);
      }
    );
  } else {
    res.redirect("register");
  }
});

app.post("/search", (req, res) => {
  const term = req.body.search;
  const allData = Promise.all([
    GoodreadsProvider.search(term),
    MovieDBProvider.search(term),
    YelpProvider.search(term)
  ])
  .then(data => res.json(data));
  // for each provider available
  // provider.search(term).then(data) => store data
  // return all data from all providers
  // res.redirect('/');
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});

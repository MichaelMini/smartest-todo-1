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

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");

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

// Register page
app.get("/register", (req, res) => {
  console.log("user_id", req.session.user_id);
  res.render("register");
});

app.post("/register", (req, res) => {
  const user_name = req.body.name;
  const password = req.body.password;
  knex('users')
    .insert({'user_name': user_name, 'password': password})
    .returning('id')
    .asCallback((err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("oh crap.  see server log.");
        return;
      }
      console.log("hopefully the new userid is in this: ", result);
      if (result.length !== 1) {
        console.log("what the hell is with this non-length-1 result: ", result);
        res.status(500).send("oh crap.  see server log.");
        return;
      }
      req.session.user_id = result[0];
      res.redirect("register");  // TODO: better redirect
    });
});

// Home page
app.get("/", (req, res) => {
  res.render("index");
});

app.post("/search", (req, res) => {
  const search = req.body.search;
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});

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

const AmazonProvider     = require('./api/amazon.js');
const GoodreadsProvider  = require('./api/goodread.js');
const MovieDBProvider    = require('./api/moviedb.js');
const YelpProvider      = require('./api/yelp.js');

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
  // console.log("user_id", req.user);
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
    // console.log("hopefully the new userid is in this: ", results);
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


//Save todo to database
// app.post("/save", (req, res) => {

//   let savedTodo = req.name;
//   let savedCategory = req.category;
//   let savedAPI = "Good Reads";
//   let doneStatus = false;
//   let userID = req.user_id;

//   console.log("test");

//   knex.select().from('todos').where('user_id', userID)
//   .then((res) => {
//     .insert( {'todo_item': savedTodo, 'todo_catagory': savedCategory, 'api_source': savedAPI, 'done_status': doneStatus, 'user_id': userID })
//     .returning('id');
//   })
//   .catch((err) => {
//     if (err) {
//       console.log(err);
//       res.status(500).send("oh crap.  see server log.");
//       return;
//     }
//   });


// });





// Home page
app.get("/", (req, res) => {
  if (req.user) {
    console.log('user id is:', req.user)

    knex.select('user_name').from('users').where('id', req.user)
      .then((results) => {
        console.log("hopefully the new userid is in this: ", results, 'id: ', req.user);
        if (results.length !== 1) {
          console.log("what the hell is with this non-length-1 result: ", results);
          res.status(500).send("oh crap.  see server log.");
            return;
        }
        // console.log(results[0].user_name);
        // console.log("I hate everything about you -- Ugly Kid Joe");
        let templateVar = {
          user_name: results[0].user_name,
          user_id: req.user,
          todo_items: [
            // { todo_item_id: 22, name: "*be awesome", category: "Life Goal" },
            // { todo_item_id: 26, name: "*breath", category: "Product" },
            // { todo_item_id: 32, name: "*rawk", category: "Music" },
          ]
        };
        res.render("index", templateVar);
      }
    );
  } else {
    res.redirect("register");
  }
});

app.post("/search", (req, res) => {
  const term = req.body.search;
  if (!term) {
    res.status(401).send('You left the input box empty when you submitted. <br><br> Please try again <a href="/">here</a>');
    return;
  } else {
    // from http://stackoverflow.com/questions/31424561/wait-until-all-es6-promises-complete-even-rejected-promises
    function reflect(promise){
      return promise.then(function(v){ return {v:v, status: "resolved" }},
                          function(e){ return {e:e, status: "rejected" }});
    }

    var allData = Promise.all([

      GoodreadsProvider.search(term)//,
      // YelpProvider.search(term)
    ].map(reflect))//.then(console.log('from app.post in Server:', data))
    // .then(data => res.send(data));
    .then(function(apiResponses){

      let goodReadsResponse;
      if (apiResponses[0].e) {
        goodReadsResponse = { }; // dummy data to deal with error in API call
      } else {
        goodReadsResponse = apiResponses[0];
      }

      let todo_item_id = Math.floor(Math.random() * 60) + 10;
      let cataOptions = Math.floor((Math.random() * 4) + 1);
      let category = "";
      switch (cataOptions) {
          case 1:
              category = "Books";
              break;
          case 2:
              category = "Food";
              break;
          case 3:
              category = "Movies";
              break;
          case 4:
              category = "Products";
      }
      var name = goodReadsResponse.v.title;
      var source = goodReadsResponse.v.source;
      var author = goodReadsResponse.v.author;
      // goodReadsResponse.v.title

      let outgoingResponse = {
        name: name,
        category: category,
        source: source
      };
      console.log('goodReadsResponse: ', goodReadsResponse)
      console.log('outgoingResponse: ',outgoingResponse);
      res.json(outgoingResponse);
    })
    .catch(function(error){
      console.log("I thought we reflected until this stopped happening?", error);
      res.json({
        error: "not the bees" // TODO: don't be like Jeremy.  no one likes Nick Cage
      });
    });

    // for each provider available
    // provider.search(term).then(data) => store data
    // return all data from all providers
    // res.redirect('/');
  }
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});

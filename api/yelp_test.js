require('dotenv').config();

const ENV = ../process.env

let Yelp = require('yelp');

let yelp = new Yelp({
  consumer_key: ENV.YELP_key,
  consumer_secret: ENV.YELP_secret ,
  token: ENV.YELP_token,
  token_secret: ENV.YELP_token_secret,
});


yelp.search({ term: 'Nice', location: 'Vancouver', category_filter: 'restaurants', limit: 10, sort: 0 })
.then(function (data) {


  data.businesses.forEach(function(restaurant){
    console.log(restaurant.name);

  });

})
.catch(function (err) {
  console.error(err);
});




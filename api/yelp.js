const Yelp = require('yelp');

const yelp = new Yelp({
  // consumer_key: process.env.consumer_key,
  // consumer_secret: process.env.consumer_secret,
  // token: process.env.token,
  // token_secret: process.env.token_secret
    consumer_key: process.env.YELP_key,
  consumer_secret: process.env.YELP_secret ,
  token: process.env.YELP_token,
  token_secret: process.env.YELP_token_secret
});

module.exports = {
  search(term)
  {
    return new Promise((resolve, reject) => {
      let query = {
        term: term,
        location: 'Vancouver',
        category_filter: 'restaurants',
        sort: 0
      }
      yelp.search(query, (err, data) => {
        if(err) { return reject(err); }
        // console.log(data);
        // console.log(data.businesses[0].name);
        // console.log(data.businesses[0].phone);
        let title = data.businesses[0].name;
        let category;

        if (title.includes(term)) {
          category = "Restaurant";
        }

        let yelpResult = {
          title: data.businesses[0].name,
          source: "Yelp",
          category: "Restaurant"
          // phone: data.businesses[0].phone
        }
        console.log('yelpResult: ', yelpResult)
        resolve(yelpResult);
      });
    })
  }
}

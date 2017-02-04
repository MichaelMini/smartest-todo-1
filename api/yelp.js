const Yelp = require('yelp');
const keys = process.env;
const yelp = new Yelp({
  consumer_key: keys.consumer_key,
  consumer_secret: keys.consumer_secret,
  token: keys.token,
  token_secret: keys.token_secret,
});

module.exports = {
  search(term)
  {
    return new Promise((resolve, reject) => {
      let query = { term: term, location: 'Vancouver' }
      yelp.search(query, (err, data) => {
        if(err) { return reject(err); }
        resolve(data);
      });
    })
  }
}

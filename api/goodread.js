const SimpleGoodreads = require('simple-goodreads');

var goodreads = new SimpleGoodreads();

module.exports = {
  search(term)
  {
    return new Promise((resolve, reject) => {
      goodreads.searchBook(term, (err, data) => {
        if(err) { return reject(err); }
        resolve(data);
      });
    })
  }
}

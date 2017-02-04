const SimpleGoodreads = require('simple-goodreads');

var goodreads = new SimpleGoodreads();

module.exports = {
  search: function(term) {
    return new Promise((resolve, reject) => {
      goodreads.searchBook(term, (err, data) => {
        if(err || !data) { return reject(err); }
        let something = {
          title: data.title,
          author: data.author
        }

        resolve(something);
      });
    })
  }
}

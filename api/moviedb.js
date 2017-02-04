const MovieDB = require('moviedb')(process.env.MovieDB);

module.exports = {
  search(term)
  {
    return new Promise((resolve, reject) => {
      let query = {"query": term};
      MovieDB.searchMovie(query, (err, data) => {
        if(err) { return reject(err); }
        resolve(data);
      });
    })
  }
}

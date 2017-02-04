const MovieDB = require('moviedb')(process.env.MovieDB);

module.exports = {
  search(term)
  {
    return new Promise((resolve, reject) => {
      let query = {"query": term};
      console.log(query);
      MovieDB.searchMovie(query, (err, data) => {
        if(err) { return reject(err); }
        console.log(data);
        resolve(data);
      });
    })
  }
}

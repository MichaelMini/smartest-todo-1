const MovieDB = require('moviedb')(process.env.MovieDB);

module.exports = {
  search(term)
  {
    return new Promise((resolve, reject) => {
      let query = {"query": term};

      MovieDB.searchMovie(query, (err, data) => {
        if(err) { return reject(err); }
        let moviedbResults = {
          title: data.results[0].title,
          release_date: data.results[0].release_date
        }
        console.log('moviedbResults: ', moviedbResults);
        resolve(moviedbResults);
      });
    })
  }
}

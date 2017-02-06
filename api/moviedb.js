const MovieDB = require('moviedb')(process.env.MovieDB);

module.exports = {
  search(term)
  {
    return new Promise((resolve, reject) => {
      let query = {"query": term};

      MovieDB.searchMovie(query, (err, data) => {
        if(err) { return reject(err); }
        // console.log('moviedb title : ',data.results)
        let moviedbResults = {
          title: data.results[0].title,
          source: "The Movie DB"
          // release_date: data.results[0].release_date
        }
        console.log('moviedbResults: ', moviedbResults);
        resolve(moviedbResults);
      });
    })
  }
}

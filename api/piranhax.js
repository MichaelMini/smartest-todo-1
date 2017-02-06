const Piranhax = require("piranhax");

const client = new Piranhax(
  process.env.AWSAccessKeyId,
  process.env.AWSSecretKey,
  process.env.awsTag
);

const AmazonProvider = require('./amazon.js');

module.exports = {
  search(term)
  {
    return new Promise((resolve, reject) => {



    client.ItemSearch("All", {
       keywords: term
     }).then(results => {
        // results is a response object, see below for further information.
        // console.log(results.data());
        // results.get("Item[0].ItemLinks.ItemLink.Description")

        let title = results.get("Item[0].ItemAttributes.Title");
        let movie = results.get("Item[0].ItemAttributes.Actor");
        let product = results.get("Item[0].ItemAttributes.ProductGroup");
        let category;

        let ASIN =  results.get("Item[0].ASIN");
        // console.log(ASIN);

        if (movie && title.toLowerCase().includes(term.toLowerCase())) {
          category = "Movie/TV Series";
        } else if (product === "Book" && title.toLowerCase().includes(term.toLowerCase())) {
          category = "Book";
        } else {
          category = "Product";
        }



        let amazonImage = Promise.all([
              AmazonProvider.search(ASIN)
        ]).then(function(image){
          return image;
        })

        let amazonResult = {
          title,
          image: amazonImage,
          source: "Amazon",
          category
        }

        // get first item ASIN
        // console.log("Results from Amazon", results.get("Item"));
        // console.log("Actors from Amazon", results.get("Item[0].ItemAttributes.Actor"));

        // let manufacturer = results.get("Item[0].ItemAttributes.Manufacturer");

        // console.log(results[0].MediumImage);


        // let amazonImage = results[0].MediumImage;



        // let image = response[0].MediumImage;
        // console.log(image);

        resolve(amazonResult);

      }).catch(err => {
        console.log("Why error?", err)
      })
    });
  }
}

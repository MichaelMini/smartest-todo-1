const Piranhax = require("piranhax");
const client = new Piranhax(
  process.env.AWSAccessKeyId,
  process.env.AWSSecretKey,
  process.env.awsTag
);

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

        // get first item ASIN
        // console.log(results.get("Item[0].ItemAttributes.ProductGroup"));
        // console.log(results.get("Item[0].ItemAttributes.Actor"));
        let title = results.get("Item[0].ItemAttributes.Title");
        let movie = results.get("Item[0].ItemAttributes.Actor");
        let product = results.get("Item[0].ItemAttributes.ProductGroup");
        let category = "";
        // let manufacturer = results.get("Item[0].ItemAttributes.Manufacturer");

        if (movie) {
          category = "Movie/TV Series"
        } else if (product === "Book") {
          category = "Book"
        }

        let amazonResult = {
          title,
          source: "Amazon",
          category
        }

        resolve(amazonResult);

      }).catch(err => {
        console.log("Why error?", err)
      })
    });
  }
}

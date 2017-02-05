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
        console.log(results.get("Item[0].ItemAttributes"));
        let title = results.get("Item[0].ItemAttributes.Title");
        let manufacturer = results.get("Item[0].ItemAttributes.Manufacturer");

        let amazonResult = {
          title,
          manufacturer
        }

        resolve(amazonResult);

      }).catch(err => {
        console.log("Why error?", err)
      })
    });
  }
}

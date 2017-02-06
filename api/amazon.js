const amazon = require('amazon-product-api');
const amazonClient = new amazon.createClient({
  awsId: process.env.AWSAccessKeyId,
  awsSecret: process.env.AWSSecretKey,
  awsTag: process.env.awsTag
});


module.exports = {
  search(ASIN)
  {
    return new Promise((resolve, reject) => {
      amazonClient.itemLookup({
          ItemId: ASIN,
          responseGroup: 'ItemAttributes,Images'
        }).then(function(results) {
          // console.log(results);

          let image = results[0].MediumImage[0].URL;

          resolve(image);

        }).catch(function(err) {
          console.log(err);
        });
            //  console.log(results[0].MediumImage);
            //  let image = response[0].MediumImage;
            //  console.log(image);
            //  resolve(image);

            //  console.log(results);
          //  }
          // });
    });
  }
}

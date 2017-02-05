const amazon = require('amazon-product-api');

module.exports = {
  search(term)
  {
    return new Promise((resolve, reject) => {
      let query = { keywords: term };
      // console.log(query);

      const client = amazon.createClient({
        awsId: process.env.AWSAccessKeyId,
        awsSecret: process.env.AWSSecretKey,
        awsTag: process.env.awsTag
      });

      client.itemSearch(query)
        
        .then(function(results){

          console.log('amazon:',results[0].ItemAttributes);

        })
        .catch(function(err){
          console.log(err.error.object);
          console.log(err);
        });
      });
    }
  }

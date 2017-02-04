require('dotenv').config();
const amazon = require('amazon-product-api');

const client = amazon.createClient({
  awsId: AKIAIEHGNI72F7ZKQ2DQ,
  // process.env.AWSAccessKeyId,
  awsSecret: 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,
  // process.env.AWSSecretKey,
  awsTag: "aws Tag"
});

client.itemSearch({
  director: 'Quentin Tarantino',
  actor: 'Samuel L. Jackson',
  searchIndex: 'DVD',
  audienceRating: 'R',
  responseGroup: 'ItemAttributes,Offers,Images'
}).then(function(results){
  console.log(results);
}).catch(function(err){
  console.log(err);
});

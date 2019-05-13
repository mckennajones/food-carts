'use strict';

const AWS = require('aws-sdk');
const yelp = require('yelp-fusion');

const s3 = new AWS.S3();
const client = yelp.client("your-api-token-here");

module.exports.save = (event, context, callback) => {
  let promises = [];
  let search_request = {
    term:'food carts',
    location: 'portland, or',
    radius: 2000,
    limit: 50,
    offset: 0
  };

  for (let i = 0; i < 5; i++) {
    search_request.offset = i * search_request.limit;
    promises.push(client.search(search_request));
  }

  Promise.all(promises).then(values => {
    let json = values[0].jsonBody.businesses;
    for (let i = 1; i < values.length; i++) {
      json = json.concat(values[i].jsonBody.businesses);
    }
    s3.putObject({
        Bucket: process.env.BUCKET,
        Key: 'food-carts',
        Body: JSON.stringify(json, null, 2),
      }).promise().then(v => callback(null, v), callback);
  });
};

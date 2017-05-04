const AWS = require('aws-sdk');
const config = require('config');

let SES;

if (process.env.NODE_ENV === 'production') {
  SES = new AWS.SES({
    region: 'us-east-1',
  });
} else {
  SES = new AWS.SES({
    region: 'us-east-1',
    accessKeyId: config.aws.accessKeyId,
    secretAccessKey: config.aws.secretAccessKey,

  });
}

exports.SES = SES;

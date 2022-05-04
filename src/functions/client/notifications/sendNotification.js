/* Importing the SNS object from the aws-sdk. */
const { SNS } = require("aws-sdk");

/* A function that is being exported from the file. */
module.exports.notification = async (clientID) => {
  /* Creating a new SNS object. */
  const sns = new SNS();
  /* Logging the clientID to the console. */
  console.log(clientID);
  // Create publish parameters
  /* Creating a variable called params that is an object with two properties. The first property is
  called Message and it is an object with a property called clientID. The second property is called
  TopicArn and it is a string. */
  var params = {
    Message: JSON.stringify({ clientID: clientID }),
    TopicArn:
      "arn:aws:sns:us-east-1:661329848707:aws-academy-dev-clientCreatedSNS",
  };

  // Create promise and SNS service object
  /* Creating a promise that is going to publish the params object to the SNS topic. */
  var publishTextPromise = sns
    .publish(params)
    .promise();

  // Handle promise's fulfilled/rejected states
  /* A promise that is going to publish the params object to the SNS topic. */
  publishTextPromise
    .then(function (data) {
      console.log(JSON.stringify(data));
      // console.log(
      //   `Message ${params.Message} sent to the topic ${params.TopicArn}`
      // );
      console.log("MessageID is " + data.MessageId);
    })
    .catch(function (err) {
      console.error(err, err.stack);
    });
};
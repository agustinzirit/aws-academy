/* Importing the SNS object from the aws-sdk. */
const { SNS } = require("aws-sdk");

/* A function that is being exported from the file. */
module.exports.notification = async (clientID) => {
  /* Creating a variable called params that is an object with two properties. The first property is
  called Message and it is an object with a property called clientID. The second property is called
  TopicArn and it is a string. */
  var params = {
    Message: JSON.stringify({ clientID: clientID }),
    TopicArn:
    "arn:aws:sns:us-east-1:661329848707:aws-academy-dev-clientCreatedSNS",
  };
  /* Creación de un nuevo objeto de SNS y publicación del objeto params en el tema de SNS. */
  const sns = new SNS().publish(params).promise();

  // Handle promise's fulfilled/rejected states
  /* A promise that is going to publish the params object to the SNS topic. */
  sns
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
/* Importing the SNS object from the aws-sdk. */
const { SNS } = require("aws-sdk");

/* A function that is being exported from the file. */
module.exports.notification = async (clientID) => {

  /* Creación de un nuevo objeto SNS y publicación de un mensaje en el tema. */
  const params = {
    Message: JSON.stringify({ clientID: clientID }),
    TopicArn:
    "arn:aws:sns:us-east-1:661329848707:aws-academy-dev-clientCreatedSNS",
  };
  const sns = new SNS().publish(params).promise();

  console.log("Visualizar log");
  console.log(JSON.stringify({params}));

  /* Una promesa que se está resolviendo. */
  sns
    .then(function (data) {
      console.log("Se publico correctamente...");
      console.log(
        `Message ${params.Message} sent to the topic ${params.TopicArn}`
      );
      console.log("MessageID is " + data.MessageId);

      console.log("Fin de la publicacion...");
    })
    .catch(function (err) {
      console.log("Hubo un error... ");
      console.log(err, err.stack);
    });
};
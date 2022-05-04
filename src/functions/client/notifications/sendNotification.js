/* Importing the SNS object from the aws-sdk. */
const { SNS } = require("aws-sdk");
/* Importando la función `sendSQSCard` desde el archivo `assignCard.js` ubicado en la carpeta `queue`. */
// const sendSQSCard = require("../../../queue/assignCard");
const sns = new SNS();

/* A function that is being exported from the file. */
module.exports.notification = async (clientID) => {

  /* Creación de un nuevo objeto SNS y publicación de un mensaje en el tema. */
  const params = {
    Message: clientID,
    TopicArn:	process.env.CLIENT_CREATED_TOPIC_ARN
  };

	console.log(params.TopicArn);
  console.log("Visualizar log");
  console.log("test");

	/* Publicación de un mensaje al tema. */
	sns.publish(params, (err, data) => {
		if (err) {
			console.log("Hubo un error... ");
			console.log(err, err.stack);
		} else {
			console.log("Se publico correctamente...");
			console.log(`Message ${params.Message} sent to the topic ${params.TopicArn}`);
			console.log("MessageID is " + data.MessageId);

			console.log("Fin de la publicacion...");

			/* Envío del ID de cliente a la cola de Card. */
			// sendSQSCard(params.Message);
		}
	});
};
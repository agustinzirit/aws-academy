/* Importing the SNS object from the aws-sdk. */
const SNS = require("aws-sdk/clients/sns");

const sns = new SNS();

/* A function that is being exported from the file. */
module.exports.notification = async (clientID) => {

  /* Creación de un nuevo objeto SNS y publicación de un mensaje en el tema. */
  const params = {
		Message: JSON.stringify({ clientID }),
		TopicArn: process.env.CLIENT_CREATED_TOPIC_ARN,
	};

	/* Publicación de un mensaje al tema. */
	await sns.publish(params).promise().then(() => {
		console.log("Se publico correctamente...");
		console.log(`Message ${params.Message} sent to the topic ${params.TopicArn}`);
		console.log("Fin de la publicacion...");
	}).catch(err => {
			console.log("Hubo un error... ");
			console.log(err, err.stack);
	});
};
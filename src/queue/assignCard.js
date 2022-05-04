const { SQS } = require("aws-sdk");

const sendSQSCard = (clientID) => {
  const params = {
		MessageBody: clientID,
		QueueUrl: process.env.QUEUE_CARD_URL,
	};

  SQS.sendMessage(params, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log({result});
  });
};

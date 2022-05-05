
module.exports.handler = (event) => {

	const note = event.Records[0].Sns.Message;
	//define if approved note
	console.log("Desde analizador del SNS");
	console.log(note);

}
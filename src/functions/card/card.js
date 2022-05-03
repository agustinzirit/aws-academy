import { v4 } from "uuid";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import Faker from "faker/lib";
import moment from "moment";

const generateCard = async (clienId, cardAssigned) => {

  const id = v4();
  const createdAt = new Date();
  const faker = new Faker();

  const newData = {
    id,
    number: faker.finance.creditCardNumber(),
    cvv: faker.finance.creditCardCVV(),
    date_due: faker.date.between('2022-01-01', '2024-12-31'),
    card_assigned: cardAssigned,
    clienId,
    createdAt
  };

  const ddb = new DocumentClient();
  const params = {
    TableName: 'Card',
    Item: newData
  };

  await ddb.put(params).promise();

  return newData;

}

module.exports.handler = async (event) => {

  const { clienId } = JSON.parse(event.body);

  try {
    const { date_birth } = await getClientById(clienId);
    const age = moment().diff(moment(date_birth, "YYYY-MM-DD"), 'years');
    const assignCard = age < 45 ? "Classic" : "Gold";
    const newData = await generateCard(clienId, assignCard);

    return {
      statusCode: 200,
      body: JSON.stringify(newData)
    };

  } catch (error) {
    console.log(error);
  }

}
import { v4 } from "uuid";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import moment from "moment";

const getClientById = async (clientId) => {
  const params = {
    TableName: 'Client',
    Key: { id: clientId }
  }
  const ddb = new DocumentClient();
  const client = await ddb.get(params).promise()
  const data = client.Item;

  return data;
}

const getGiftByDateBirth = (dateBirth) => {

  if (moment(dateBirth).isBetween(moment(""), moment(""))) { // Primavera
    return "Shirt/Camisa";
  } else if (moment(dateBirth).isBetween(moment(""), moment(""))) { // Verano
    return "T-Shirt/Remera";
  } else if (moment(dateBirth).isBetween(moment(""), moment(""))) { // Oto#o
    return "Diver/Buzo";
  } else // Invierno
    return "Sweater"
}

const assignGift = async (clienId, gift) => {

  const id = v4();
  const createdAt = new Date();

  const newData = {
    id,
    clienId,
    gift,
    createdAt
  };

  const ddb = new DocumentClient();
  const params = {
    TableName: 'Gift',
    Item: newData
  };

  await ddb.put(params).promise();

  return newData;

}

module.exports.handler = async (event) => {
  const { clienId } = JSON.parse(event.body);
  const { date_birth } = await getClientById(clienId);
  const getGift = getGiftByDateBirth(date_birth);

  try {
    const newData = await assignGift(clienId, getGift);

    return {
      statusCode: 200,
      body: JSON.stringify(newData)
    };
  } catch (error) {
    console.log(error);
  }
}

// module.exports = {
//   addGift
// }
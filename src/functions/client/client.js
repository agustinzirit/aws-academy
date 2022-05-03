"use strict";

/* Importing the required libraries. */
const { v1 } = require("uuid");
const AWS = require("aws-sdk");
const { notification } = require("./notifications/sendNotification");

/* The handler function that is called when the Lambda function is invoked. */
module.exports.handler = async (event, context, callback) => {
  /* Destructuring the event.body and creating a new object with the new data. */
  const { first_name, last_name, date_birth } = JSON.parse(event.body);
  const id = v1();
  const createdAt = new Date();
  const newData = { id, first_name, last_name, date_birth, createdAt };

 /* Creating a new client in the database. */
  /* Creación de un nuevo cliente en la base de datos. */
  try {
    const ddb = new AWS.DynamoDB.DocumentClient();
    const params = {
      TableName: "Client",
      Item: newData,
    };

    await ddb.put(params).promise();

    // if (client) {
      await notification(newData.id);
    // }

    return {
      statusCode: 200,
      body: JSON.stringify(newData),
    };
  } catch (error) {
    console.log(error);
  }
};

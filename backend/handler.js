const AWS = require("aws-sdk");
const express = require("express");
const serverless = require("serverless-http");
const cors = require('cors')

const app = express();
app.use(cors())

const USERS_TABLE = process.env.USERS_TABLE;
const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

app.get("/quotes", async function (req, res) {
  const params = {
    TableName: USERS_TABLE,
    Key: {
      quote_id: Number(req.query.id),
    },
  };
  try {
    const { Item } = await dynamoDbClient.get(params).promise();
    if (Item) {
      const { quote_id: id, quote } = Item;
      res
        .status(200)
        .json({ id, quote });
    } else {
      res
        .status(404)
        .json({ error: 'Could not find quote with provided "id"' });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Could not retreive quote" });
  }
});



module.exports.handler = serverless(app);

const express = require("express");
const graphqlHTTP = require("express-graphql");
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");
const schema = require("./graphql/schema.js");

const localUrl = "mongodb://localhost:27017";
const serverUrl =
  "mongodb+srv://jackson:S3XpnmNnOaWNbrZY@execute.ja3x6.mongodb.net/execute?retryWrites=true&w=majority";

MongoClient.connect(
  serverUrl,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, db) => {
    if (err) throw err;
    global.users = db.db("execute").collection("userData");
    console.log("Connected to database");
  }
);

const app = express();

app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(8080, () => console.log("Server running on port 8080"));

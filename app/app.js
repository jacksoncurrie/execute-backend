var express = require('express');
var cors = require('cors');
var graphqlHTTP = require('express-graphql');
var userType = require('./graphql/userType.js');
var { GraphQLSchema, GraphQLNonNull, GraphQLInt, GraphQLList, GraphQLString, GraphQLObjectType } = require('graphql');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";
//var url = "mongodb+srv://dbUser:user123@execute-vxpji.mongodb.net";

MongoClient.connect(url, { useNewUrlParser: true }, (_err, db) => {
    var dbo = db.db("execute");
    var users = dbo.collection("userData");

    var schema = new GraphQLSchema({
        query: new GraphQLObjectType({
            name: 'GetUsersData',
            fields: {
                user: {
                    type: userType,
                    args: {
                        username: { type: new GraphQLNonNull(GraphQLString) }
                    },
                    resolve: async (_rootValue, args) => {
                        return await users.findOne({username: args.username});
                    }
                }
            }
        }),
        mutation: new GraphQLObjectType({
            name: 'AddNewUser',
            fields: {
                createUser: {
                    type: userType,
                    args: {
                        username: { type: new GraphQLNonNull(GraphQLString) },
                        password: { type: new GraphQLNonNull(GraphQLString) }
                    },
                    resolve: async (_rootValue, args) => {
                        (await users.insertOne(args)).ops[0];
                    }
                }
            }
        })
    });

    var app = express();
    app.use(cors());
    app.use('/graphql', graphqlHTTP({
        schema: schema,
        graphiql: true,
    }));

    app.listen(3000, () => console.log('Server running on port 3000'));
});
var express = require('express');
var graphqlHTTP = require('express-graphql');
var { GraphQLSchema, GraphQLNonNull, GraphQLInt, GraphQLList, GraphQLString, GraphQLObjectType } = require('graphql');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";

MongoClient.connect(url, {useNewUrlParser: true}, function(_err, db){
    var dbo = db.db("execute");
    var users = dbo.collection("userData");

    const userType = new GraphQLObjectType({
        name: 'user',
        fields: {
            username: { type: GraphQLString },
            password: { type: GraphQLString }
        }
    });

    var schema = new GraphQLSchema({
        query: new GraphQLObjectType({
            name: 'Query',
            fields: {
                users: {
                    type: new GraphQLList(userType),
                    resolve: async () => {
                        return await users.find().toArray();
                    }
                },
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
            name: 'Mutation',
            fields: {
                createUser: {
                    type: userType,
                    args: {
                        username: { type: new GraphQLNonNull(GraphQLString) },
                        password: { type: new GraphQLNonNull(GraphQLString) }
                    },
                    resolve: async (_rootValue, args) => {
                        return (await users.insertOne(args)).ops[0];
                    }
                }
            }
        })
    });

    var app = express();
    app.use('/graphql', graphqlHTTP({
        schema: schema,
        graphiql: true,
    }));

    app.listen(3000, () => console.log('Server running on port 3000'));
});
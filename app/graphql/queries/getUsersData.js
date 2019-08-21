const { GraphQLNonNull, GraphQLString } = require('graphql')
const userOutputType = require('./userOuputType.js');

module.exports = {
    type: userOutputType,
    args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve: async (_rootValue, args) => {
        return await users.findOne({ username: args.username, password: args.password });
    }
}
const { GraphQLNonNull, GraphQLString } = require('graphql');

module.exports = {
    type: GraphQLString,
    args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve: async (_rootValue, args) => {
        if (await users.findOne({ username: args.username })) {
            return `User '${args.username}' already exists`;
        } else {
            await users.insertOne({
                username: args.username,
                password: args.password,
                calendarItems: [],
                scheduleItems: [],
                tasks: []
            });
            return `User '${args.username}' added successfully`;
        }
    }
}
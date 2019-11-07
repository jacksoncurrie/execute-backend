const { GraphQLNonNull, GraphQLString } = require('graphql')
const userOutputType = require('./userOuputType.js');

module.exports = {
    type: userOutputType,
    args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        startTime: { type: GraphQLString },
        endTime: { type: GraphQLString }
    },
    resolve: async (_rootValue, args) => {
        var data = await users.findOne({ 
            username: args.username,
            password: args.password 
        });
        if (args.startTime && args.endTime) {
            let items = { calendarItems: [], scheduleItems: data.scheduleItems, tasks: [] };
            for (let i of data.calendarItems) {
                if (i.startTime.split('T')[0] >= args.startTime && i.startTime.split('T')[0] <= args.endTime ||
                  i.endTime.split('T')[0] >= args.startTime && i.endTime.split('T')[0] <= args.endTime)
                    items.calendarItems.push(i);
            }
            for (let i of data.tasks) {
                if (!i.startTime)
                    continue;
                if (i.startTime.split('T')[0] >= args.startTime && i.startTime.split('T')[0] <= args.endTime)
                    items.tasks.push(i);
            }
            return items;
        } else {
            return data;
        }
    }
}
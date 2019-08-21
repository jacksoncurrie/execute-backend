const { GraphQLString } = require('graphql');
const userInputType = require('./userInputType.js');
ObjectID = require('mongodb').ObjectID;

module.exports = {
    type: GraphQLString,
    args: userInputType,
    resolve: async (_rootValue, args) => {
        if (await users.findOne({ username: args.username, password: args.password })) {
            if (args.calendarItem != null) {
                await users.updateOne(
                    { username: args.username },
                    { $pull: { calendarItems: { 
                        calendarItemID: ObjectID(args.calendarItem.calendarItemID) 
                    }}}
                );
            }
            if (args.scheduleItem != null) {
                await users.updateOne(
                    { username: args.username },
                    { $pull: { scheduleItems: { 
                        scheduleItemID: ObjectID(args.scheduleItem.scheduleItemID) 
                    }}}
                );
            }
            if (args.task != null) {
                await users.updateOne(
                    { username: args.username },
                    { $pull: { tasks: { 
                        taskID: ObjectID(args.task.taskID) 
                    }}}
                );
            }
            return `Removed item from user '${args.username}' successfully`;
        } else {
            return `Incorrect details for user '${args.username}'`;
        }
    }
}
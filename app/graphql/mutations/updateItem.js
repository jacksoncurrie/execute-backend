const { GraphQLString } = require('graphql');
const userInputType = require('./userInputType.js');
ObjectID = require('mongodb').ObjectID;

module.exports = {
    type: GraphQLString,
    args: userInputType,
    resolve: async (_rootValue, args) => {
        if (await users.findOne({ username: args.username, password: args.password })) {
            if (args.calendarItem != null) {
                await users.updateOne({
                    username: args.username,
                    calendarItems: { $elemMatch: { calendarItemID: ObjectID(args.calendarItem.calendarItemID) }}
                },
                { $set: {
                    'calendarItems.$.title': args.calendarItem.title,
                    'calendarItems.$.startTime': args.calendarItem.startTime,
                    'calendarItems.$.endTime': args.calendarItem.endTime
                }});
            }
            if (args.scheduleItem != null) {
                await users.updateOne({
                    username: args.username,
                    scheduleItems: { $elemMatch: { scheduleItemID: ObjectID(args.scheduleItem.scheduleItemID) }}
                },
                { $set: {
                    'scheduleItems.$.title': args.scheduleItem.title,
                    'scheduleItems.$.category': args.scheduleItem.category,
                    'scheduleItems.$.startTime': args.scheduleItem.startTime,
                    'scheduleItems.$.endTime': args.scheduleItem.endTime
                }});
            }
            if (args.task != null) {
                await users.updateOne({
                    username: args.username,
                    tasks: { $elemMatch: { taskID: ObjectID(args.task.taskID) }}
                },
                { $set: {
                    'tasks.$.title': args.task.title,
                    'tasks.$.priority': args.task.priority,
                    'tasks.$.estimatedTime': args.task.estimatedTime,
                    'tasks.$.startTime': args.task.startTime,
                }});
            }
            return `Updated item for user '${args.username}' successfully`;
        } else {
            return `User '${args.username}' does not exist`;
        }
    }
}
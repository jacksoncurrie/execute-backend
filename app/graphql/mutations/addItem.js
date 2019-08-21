const { GraphQLString } = require('graphql');
const userInputType = require('./userInputType.js');
const { Types } = require('mongoose');

module.exports = {
    type: GraphQLString,
    args: userInputType,
    resolve: async (_rootValue, args) => {
        if (await users.findOne({ username: args.username, password: args.password })) {
            if (args.calendarItem != null) {
                await users.updateOne(
                    { username: args.username },
                    { $push: { calendarItems: {
                        calendarItemID: Types.ObjectId(),
                        title: args.calendarItem.title,
                        startTime: args.calendarItem.startTime,
                        endTime: args.calendarItem.endTime
                    }}}
                );
            }
            if (args.scheduleItem != null) {
                await users.updateOne(
                    { username: args.username },
                    { $push: { scheduleItems: {
                        scheduleItemID: Types.ObjectId(),
                        title: args.scheduleItem.title,
                        category: args.scheduleItem.category,
                        startTime: args.scheduleItem.startTime,
                        endTime: args.scheduleItem.endTime
                    }}}
                );
            }
            if (args.task != null) {
                await users.updateOne(
                    { username: args.username },
                    { $push : { tasks: {
                        taskID: Types.ObjectId(),
                        title: args.task.title,
                        priority: args.task.priority,
                        estimatedTime: args.task.estimatedTime,
                        startTime: null
                    }}}
                );
            }
            return `Added item to user '${args.username}' successfully`;
        } else {
            return `Incorrect details for user '${args.username}'`;
        }
    }
}
const { GraphQLNonNull, GraphQLID, GraphQLInt, GraphQLString, GraphQLInputObjectType } = require('graphql');

const calendarItemsType = new GraphQLInputObjectType({
    name: 'calendarItemsInput',
    fields: () => ({
        calendarItemID: { type: GraphQLID },
        title: { type: GraphQLString },
        startTime: { type: GraphQLString },
        endTime: { type: GraphQLString }
    })
});

const scheduleItemsType = new GraphQLInputObjectType({
    name: 'scheduleItemsInput',
    fields: () => ({
        scheduleItemID: { type: GraphQLID },
        title: { type: GraphQLString },
        category: { type: GraphQLInt },
        startTime: { type: GraphQLInt },
        endTime: { type: GraphQLInt }
    })
});

const tasksType = new GraphQLInputObjectType({
    name: 'tasksInput',
    fields: () => ({
        taskID: { type: GraphQLID },
        title: { type: GraphQLString },
        priority: { type: GraphQLInt },
        estimatedTime: { type: GraphQLInt },
        startTime: { type: GraphQLString }
    })
});

module.exports  = {
    username: { type: GraphQLNonNull(GraphQLString) },
    password: { type: GraphQLNonNull(GraphQLString) },
    calendarItem: { type: calendarItemsType },
    scheduleItem: { type: scheduleItemsType },
    task: { type: tasksType }
}
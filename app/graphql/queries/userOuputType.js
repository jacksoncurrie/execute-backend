const { GraphQLID, GraphQLList, GraphQLInt, GraphQLString, GraphQLObjectType } = require('graphql');

const calendarItemsType = new GraphQLObjectType({
    name: 'calendarItemsOutput',
    fields: () => ({
        calendarItemID: { type: GraphQLID },
        title: { type: GraphQLString },
        startTime: { type: GraphQLString },
        endTime: { type: GraphQLString }
    })
});

const scheduleItemsType = new GraphQLObjectType({
    name: 'scheduleItemsOutput',
    fields: () => ({
        scheduleItemID: { type: GraphQLID },
        title: { type: GraphQLString },
        category: { type: GraphQLInt },
        startTime: { type: GraphQLInt },
        endTime: { type: GraphQLInt }
    })
});

const tasksType = new GraphQLObjectType({
    name: 'tasksOutput',
    fields: () => ({
        taskID: { type: GraphQLID },
        title: { type: GraphQLString },
        priority: { type: GraphQLInt },
        estimatedTime: { type: GraphQLInt },
        startTime: { type: GraphQLString }
    })
});

module.exports = new GraphQLObjectType({
    name: 'user',
    fields: () => ({
        username: { type: GraphQLString },
        calendarItems: { type: new GraphQLList(calendarItemsType) },
        scheduleItems: { type: new GraphQLList(scheduleItemsType) },
        tasks: { type: new GraphQLList(tasksType) }
    })
});
var { GraphQLInt, GraphQLList, GraphQLString, GraphQLObjectType } = require('graphql');

const calendarItemsType = new GraphQLObjectType({
    name: 'calendarItems',
    fields: {
        title: { type: GraphQLString },
        startTime: { type: GraphQLString },
        endTime: { type: GraphQLString }
    }
});

const scheduleItemsType = new GraphQLObjectType({
    name: 'scheduleItems',
    fields: {
        title: { type: GraphQLString },
        category: { type: GraphQLInt },
        startTime: { type: GraphQLInt },
        endTime: { type: GraphQLInt }
    }
});

const tasksType = new GraphQLObjectType({
    name: 'tasks',
    fields: {
        title: { type: GraphQLString },
        priority: { type: GraphQLInt },
        estimatedTime: { type: GraphQLInt },
        startTime: { type: GraphQLString }
    }
});

const userType = new GraphQLObjectType({
    name: 'user',
    fields: {
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        calendarItems: { type: new GraphQLList(calendarItemsType) },
        scheduleItems: { type: new GraphQLList(scheduleItemsType) },
        tasks: { type: new GraphQLList(tasksType) }
    }
});

module.exports = userType;
const { GraphQLSchema, GraphQLObjectType } = require('graphql');
const getUsersDataQuery = require('./queries/getUsersData.js');
const createUserMutation = require('./mutations/createUser.js');
const addItemMutation = require('./mutations/addItem.js');
const removeItemMutation = require('./mutations/removeItem.js');
const updateItemMutation = require('./mutations/updateItem.js');

const queries = new GraphQLObjectType({
    name: 'Queries',
    fields: {
        getUserData: getUsersDataQuery
    }
});

const mutations = new GraphQLObjectType({
    name: 'Mutations',
    fields: {
        createUser: createUserMutation,
        addItem: addItemMutation,
        removeItem: removeItemMutation,
        updateItem: updateItemMutation
    }
});

module.exports = new GraphQLSchema({
    query: queries,
    mutation: mutations
});
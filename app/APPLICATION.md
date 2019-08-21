# Application Development Documentation

This documentation file contains information about the location and functions of the files in this project.

## Main Entry

**app.js** is the main entry for the application. This file contains the database connection, GraphQL endpoint, and the ExpressJS server setup.

`MongoClient.connect` can be changed to use the *local* or *server* database setup on Mongo Atlas. in the `../database` folder `data.json` is some initial data that you can use to import into a collection.

The server runs on port `3000` and its only endpoint is `/graphql` where GraphiQL is setup, along with multiple queries and mutations.

The `../testing` folder has a `testAPI.html` to test the API calls from a local file. Ther is also documentation in `TESTING.md`.

## GraphQL

`./graphql` folder will  have a `schema.js` file which is the main schema for GraphQL and is what is reference in the endpoint.

It holds `queries` and `mutations` which are exported as a `GraphQLSchema` and continas references to al lthe query and mutation files.

### Queries

`./graphql/queries` folder holds all the query files, along with the `userOutputType.js` file.

`userOutputType.js` holds the output object for the database, which is used in the queries so that the user can get all fields from the database. Chaning this file will change what fields the user has access to. This will be used in the `type` object.

All other queries will be in this folder, which they will have specific arguments to output the *userOutputType* for the user. The logic for validing the API calls are located in the resolve functions of these files.

### Mutations

`./graphql/mutaitons` folder holds all the mutaiton files, along with the `userInputType.js` file.

`userInputType.js` holds the input object for the database, which is used in the mutations so that the user can send arguments to all the fields in the database. Chaning this file will change what fields the user has access to. It is similar to the `userOutputType.js` above, but will be used in the `args` object.

All other mutaions will be in this folder, which they will have the common arguments *userInputType*. The logic for validing the API calls are located in the resolve functions of these files.

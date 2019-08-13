# Execute Backend

The backend repository for the Execute project.

## Documentation

### Database

#### Collection Structure

The stucture for this project is going to be a denormalized collection with all the objects
inside the on collection **execute > userData**. 

The JSON structure of the collection for a single entry is as follows:

```
{
    _id : ObjectID,
    username : String,
    password : String,
    calendarItems:  [ 
        { 
            title: String, 
            startTime: Date,
            endTime: Date 
        },
        ...
    ],
    scheduleItems: [
        { 
            title: String,
            category: Int32 (the category code),
            startTime: Int32 (the time in minutes from 12:00am),
            endTime: Int32 (the time in minutes from 12:00am)
        }, 
        ...
    ], 
    tasks: [
        { 
            title: String,
            priority: Int32 (the priority code),
            estimatedTime: Int32 (the time in minutes),
            startTime: Date
        },
        ...
    ] 
}
```

#### Connection String

The user for the database is **Username:** *dbUser* **Password:** *user123*

The connection string for this user is: `mongodb+srv://dbUser:user123@execute-vxpji.mongodb.net`

The connection string for a local server is: `mongodb://localhost:27017`

### GraphQL API

This server is hosting a GraphQL API, with GraphiQL enabled at `http://localhost:3000/graphql`

To query this API you must have some understanding of [GraphQL](https://www.graphql.com/).

You must send a POST method with the following JSON like GraphQL query or mutation, or you can go to the GraphiQL link above to test out your queries or mutations.

#### Queries & Mutations

Use the structure of the collection above to return the data you want, if it is available.

##### Get all user's data:
```
query GetUsersData {
    user(username: "") {
        username
        password
        ...
    }
}
```

##### Create new user:
```
mutation AddNewUser {
    createUser(username: "", password: "") {
        username
        password
        ...
    }
}
```
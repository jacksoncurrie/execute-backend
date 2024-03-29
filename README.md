# Execute Backend

View API on the web https://executewebapi.azurewebsites.net/graphql.

Find and view on GitHub https://github.com/jacksoncurrie/execute-backend.

The backend repository for the Execute project. 

Testing documentation can be found in `/testing/TESTING.md`, and application documentation can be found in `/app/APPLICATION.md`.

**Current Version:** 1.3.1

### Update Notes

#### Version 1.3.1

* Fixed `startTime` and `endTime` for schedule to get all correct times coming through.

#### Version 1.3

* Added startTime and endTime to getData query so that only data within the week comes back.

#### Version 1.2

* Changed date-time formats to `yyyy-MM-dd[T]HH:mm` e.g. `"2019-01-01T19:00"`
* Changed Schedule date-time format to `d[T]HH:mm` (d is the week day integer, e.g. 0 = monday) e.g. `"1T21:00"`

#### Version 1.1

* Removed password from user output type.

#### Version 1.0

* First completed version of the project.

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
            calendarItemID: ObjectID,
            title: String, 
            startTime: DateTime (usual date and time separted by 'T'),
            endTime: DateTime (usual date and time separted by 'T')
        },
        ...
    ],
    scheduleItems: [
        { 
            scheduleItemID: ObjectID,
            title: String,
            category: Int32 (the integer for the category code),
            startTime: DayTime (interger for the day and usual time sparated by 'T'),
            endTime: DayTime (interger for the day and usual time sparated by 'T')
        }, 
        ...
    ], 
    tasks: [
        { 
            taskID: ObjectID,
            title: String,
            priority: Int32 (the integer for the priority code),
            estimatedTime: Int32 (the time in minutes),
            startTime: DateTime (usual date and time separted by 'T')
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

#### Queries

Values inside square brakets are for variables for you to add, e.g. `"[username]"` could be set to `"jackson"`

Refer to the database structure for object types.

##### Get all user's data:

Username and password are required to get any results back, startTime and endTime are optional and used to get back a certian range of data. You can get what you want by selecting the fields you want to return.

```
query GetUsersData {
    user(
        username: "[username]",
        password: "[password]",
        startTime: "[startTime]",
        endTime: "[endTime]"
    ) {
        username
        calendarItems {
            calendarItemID
            title
            startTime
            endTime
        }
        scheduleItems {
            scheduleItemID
            title
            category
            startTime
            endTime
        }
        tasks {
            taskID
            title
            priority
            estimatedTime
            startTime
        }
    }
}
```

#### Mutations

##### Create new user:

Username and password are required, you will recieve a `string` back saying if the user was added successfully or not.

```
mutation AddNewUser {
    createUser(
        username: "[username]",
        password: "[password]"
    )
}
```

##### Add new item:

Username and password are required but you can choose one or more items to update in a query. You will recieve a `string` back saying if the item was addedd successfully or not.

```
mutation AddItems {
    addItem(
        username: "[username]", 
        password: "[password]",
        calendarItem: {
            title: "[title]",
            startTime: "[startTime]",
            endTime: "[endTime]"
        },
        scheduleItem: {
            title: "[title]",
            category: [category],
            startTime: "[startTime]",
            endTime: "[endTime]"
        }
        task: {
            title: "[title]",
            priority: [priority],
            estimatedTime: [estimatedTime]
        }
    )
}
```

##### Update item:

Username and password are required and all the data for an item must be provided for it to successfully update. You can choose one or more items to update in a single query. You will recieve a `string` back saying if the item was updated successfully or not.

```
mutation UpdateItems {
    updateItem(
        username: "[username]", 
        password: "[password]",
        calendarItem: {
            calendarItemID: "[calendarItemID]",
            title: "[title]",
            startTime: "[startTime]",
            endTime: "[endTime]"
        },
        scheduleItem: {
            scheduleItemID: "[scheduleItemID]",
            title: "[title]",
            category: [category],
            startTime: "[startTime]",
            endTime: "[endTime]"
        }
        task: {
            taskID: "[taskID]",
            title: "[title]",
            priority: [priority],
            estimatedTime: "[estimatedTime]"
        }
    )
}
```

##### Remove item:

Username and password are required, and you can choose one or more of each item to remove in a single query. You will recieve a `string` back saying if the item was removed successfully or not.

```
mutation RemoveItems {
    removeItem(
        username: "[username]",
        password: "[password]",
        calendarItem: {
            calendarItemID: "[calendarItemID]"
        },
        scheduleItem: {
            scheduleItemID: "[scheduleItemID]"
        },
        task: {
            taskID: "[taskID]"
        }
    )
}
```

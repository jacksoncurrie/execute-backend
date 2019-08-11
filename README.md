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

The connection string for this user is: `mongodb+srv://dbUser:user123@execute-vxpji.mongodb.net/test`

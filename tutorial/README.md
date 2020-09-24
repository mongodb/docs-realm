# Task Tracker Tutorial

The Task Tracker is a collaborative project management tool.

## App Description

The mobile apps (Swift/iOS, Kotlin/Android, and React Native) implement the Task Tracker using MongoDB Realm Sync.

The web app implements the Task Tracker using the GraphQL integration.

## Get Started

First, create a Realm app in the Realm UI and link a cluster.

## Enable authentication

Under "Users" on the Realm UI, go to the Providers tab and enable the email/password provider.

- Select "automatically confirm users"
- Select "run a password reset function"
- Click "create new" for the reset function and use the default that is created. This reset function always denies password reset requests, but you can change that later.

## Collections

Under "Rules" on the Realm UI, add the following collections:
- tasks
- projects
- users

## Schemas

Define the schemas for each collection as follows. Please note: we may change these in future versions of the tutorial.

### Tasks

```json
{
  "title": "Task",
  "bsonType": "object",
  "required": [
    "_id",
    "_partition",
    "name",
    "status"
  ],
  "properties": {
    "_id": {
      "bsonType": "objectId"
    },
    "_partition": {
      "bsonType": "string"
    },
    "name": {
      "bsonType": "string"
    },
    "status": {
      "bsonType": "string",
      "enum": [
        "Open",
        "InProgress",
        "Complete"
      ]
    }
  }
}
```

### Projects

```json
{
  "title": "Project",
  "bsonType": "object",
  "required": [
    "_id",
    "_partition",
    "name"
  ],
  "properties": {
    "_id": {
      "bsonType": "objectId"
    },
    "_partition": {
      "bsonType": "string"
    },
    "name": {
      "bsonType": "string"
    }
  }
}
```

### Users

```json
{
  "title": "User",
  "required": [
    "_id",
    "user_id",
    "name"
  ],
  "properties": {
    "_id": {
      "bsonType": "objectId"
    },
    "user_id": {
      "bsonType": "string"
    },
    "name": {
      "bsonType": "string"
    },
    "image": {
      "bsonType": "string"
    },
    "_partition": {
      "bsonType": "string"
    }
  }
}
```

## Enable Sync

On the Sync tab, enable Sync.

- Set the partition key to `_partition` (string)

## Troubleshooting

The most common issue is schema mismatch due to frequent little tweaks to the
schema as you develop your app.

- Be sure to **check the logs in Realm UI** for more information as well as the console in your app.
- **Delete the app from the simulator** to purge local data.
- **Restart Sync** in the Realm UI by clicking "Delete Synced Data" on the Sync page.
- Be sure to **deploy your changes** in the Realm UI.
- If your schema does not match the server, **compare the class definitions from the SDKs tab in the Realm UI** with those in the client code.
- When creating objects, make sure the **partition value of your new object matches** the partition value you opened the Realm with.

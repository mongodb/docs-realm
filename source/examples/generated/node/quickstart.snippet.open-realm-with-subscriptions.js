// Initialize your App.
const app = new Realm.App({
  id: "<yourAppId>",
});

// Authenticate an anonymous user.
await app.logIn(Realm.Credentials.anonymous());


// Define an object model
const TaskSchema = {
  name: "Task",
  properties: {
    _id: "int",
    name: "string",
    status: "string?",
    progressMinutes: "int?",
    owner: "string?",
    dueDate: "date?",
  },
  primaryKey: "_id",
};

// Create a `SyncConfiguration` object.
const config = {
  schema: [TaskSchema],
  sync: {
    // Use the previously-authenticated anonymous user.
    user: app.currentUser,
    // Set flexible sync to true to enable sync.
    flexible: true,
    // Define initial subscriptions to start syncing data as soon as the
    // realm is opened.
    initialSubscriptions: {
      update: (subs, realm) => {
        subs.add(
          // Get objects that match your object model, then filter them
          // the `owner_id` queryable field
          realm.objects("Task").filtered(`owner_id = ${app.currentUser.id}`)
        );
      },
    },
  },
};

const realm = await Realm.open(config);

const TaskSchema = {
  name: "Task",
  properties: {
    _id: "objectId",
    name: "string",
    difficulty: "int",
  },
  primaryKey: "_id",
};

async function createInitialCollection() {
  await app.logIn(credentials);
  const syncConfig = {
    user: app.currentUser,
    partitionValue: "myPartition",
  };
  const realm = await Realm.open({
    schema: [TaskSchema],
    sync: syncConfig, // predefined sync configuration object
  });
  // Create some tasks in the first client
  realm.write(() => {
    realm.create("Task", {
      _id: new BSON.ObjectID(),
      name: "Buy some groceries from Trader Joes",
      difficulty: 1,
    });
    realm.create("Task", {
      _id: new BSON.ObjectID(),
      name: "Buy some notebooks from Staples",
      difficulty: 1,
    });
    realm.create("Task", {
      _id: new BSON.ObjectID(),
      name: "Wash the car",
      difficulty: 2,
    });
  });
}

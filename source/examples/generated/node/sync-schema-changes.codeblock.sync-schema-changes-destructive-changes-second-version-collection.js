const TaskSchema = {
  name: "Task",
  properties: {
    _id: "objectId",
    name: "string",
    difficulty: "int",
  },
  primaryKey: "_id",
};

const TaskSchemaV2 = {
  name: "TaskV2",
  properties: {
    _id: "objectId",
    name: "string",
    difficulty: { type: "int", optional: true },
  },
  primaryKey: "_id",
};

async function createSecondVersionOfCollection() {
  await app.logIn(credentials);
  const syncConfig = {
    user: app.currentUser,
    partitionValue: "myPartition",
  };

  const realm = await Realm.open({
    schema: [TaskSchema, TaskSchemaV2],
    sync: syncConfig, // predefined sync configuration object
  });

  // copy the objects from the initial collection to partner collection with the modified schema
  tasks.map((task) => {
    realm.write(() => {
      realm.create("TaskV2", task);
    });
  });

  // check to see if both collection have the same objects
  console.log(
    `The lists of tasks are: ${tasks.map((task) =>
      JSON.stringify(task, null, 2)
    )}`
  );
  console.log(
    `The lists of version 2 tasks are: ${tasksV2.map((task) =>
      JSON.stringify(task, null, 2)
    )}`
  );
}

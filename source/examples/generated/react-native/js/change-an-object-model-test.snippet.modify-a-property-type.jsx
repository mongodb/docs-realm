class Task extends Realm.Object {
  static schema = {
    name: "Task",
    properties: {
      _id: "objectId",
      name: "string",
      priority: "int?",
      progressMinutes: "int?",
      assignee: "Person?",
    },
    primaryKey: "_id",
  };
}

const config = {
  schema: [Task],
  schemaVersion: 2,
  migration: (oldRealm, newRealm) => {
    if (oldRealm.schemaVersion < 2) {
      const oldObjects = oldRealm.objects(Task);
      const newObjects = newRealm.objects(Task);
      // loop through all objects and set the _id property in the new schema
      for (const objectIndex in oldObjects) {
        const oldObject = oldObjects[objectIndex];
        const newObject = newObjects[objectIndex];
        newObject._id = new Realm.BSON.ObjectId(oldObject._id);
      }
    }
  },
};
const { RealmProvider } = createRealmContext(config);

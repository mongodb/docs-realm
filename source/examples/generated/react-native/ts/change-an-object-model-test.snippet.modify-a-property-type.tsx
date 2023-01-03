class Task extends Realm.Object<Task> {
  _id: Realm.BSON.ObjectId = new Realm.BSON.ObjectId();
  name!: string;
  priority?: number;
  progressMinutes?: number;
  assignee?: Person;

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
  // increment the 'schemaVersion', since the property type of '_id'
  // has been modified
  schemaVersion: 2,
  migration: (oldRealm: Realm, newRealm: Realm) => {
    if (oldRealm.schemaVersion < 2) {
      const oldObjects = oldRealm.objects(Task);
      const newObjects = newRealm.objects(Task);
      // loop through all objects and set the _id property
      // in the new schema
      for (const objectIndex in oldObjects) {
        const oldObject = oldObjects[objectIndex];
        const newObject = newObjects[objectIndex];
        newObject._id = new Realm.BSON.ObjectId(oldObject._id);
      }
    }
  },
};
// pass the configuration object with the updated
// 'schemaVersion' and 'migration' function to createRealmContext()
createRealmContext(config);

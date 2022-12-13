class Task extends Realm.Object {
  static schema = {
    name: 'Task',
    properties: {
      _id: 'objectId',
      name: 'string',
      priority: 'int?',
      progressMinutes: 'int?',
      assignee: 'Person?',
    },
    primaryKey: '_id',
  };
}

const config = {
  schema: [Task],
  schemaVersion: 2,
  migration: (oldRealm: Realm, newRealm: Realm) => {
    if (oldRealm.schemaVersion < 2) {
      const oldObjects = oldRealm.objects('Dog');
      const newObjects = newRealm.objects('Dog');
      // loop through all objects and set the _id property in the new schema
      for (const objectIndex in oldObjects) {
        const oldObject = oldObjects[objectIndex];
        const newObject = newObjects[objectIndex];
        newObject._id = oldObject._id.toHexString();
      }
    }
  },
};
const {RealmProvider} = createRealmContext(config);

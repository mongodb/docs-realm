class Person extends Realm.Object {
  static schema = {
    name: 'Person',
    properties: {
      fullName: 'string',
      age: 'int',
    },
  };
}

const config = {
  schema: [Person],
  schemaVersion: 2,
  migration: (oldRealm: Realm, newRealm: Realm) => {
    // only apply this change if upgrading to schemaVersion 2
    if (oldRealm.schemaVersion < 2) {
      const oldObjects = oldRealm.objects('Person');
      const newObjects = newRealm.objects('Person');
      // loop through all objects and set the fullName property in the new schema
      for (const objectIndex in oldObjects) {
        const oldObject = oldObjects[objectIndex];
        const newObject = newObjects[objectIndex];
        newObject.fullName = `${oldObject.firstName} ${oldObject.lastName}`;
      }
    }
  },
};
const {RealmProvider} = createRealmContext(config);

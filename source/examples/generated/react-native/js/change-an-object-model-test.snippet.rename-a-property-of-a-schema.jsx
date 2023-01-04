class Person extends Realm.Object {
  static schema = {
    name: 'Person',
    properties: {
      // rename the 'firstName' and 'lastName' property to 'fullName' in the schema
      fullName: 'string',
      age: 'int',
    },
  };
}

const config = {
  schema: [Person],
  // increment the 'schemaVersion', since 'fullName' has replaced 'firstName' and 'lastName' in the schema
  schemaVersion: 2,
  migration: (oldRealm, newRealm) => {
    // only apply this change if upgrading to schemaVersion 2
    if (oldRealm.schemaVersion < 2) {
      const oldObjects = oldRealm.objects(Person);
      const newObjects = newRealm.objects(Person);
      // loop through all objects and set the fullName property in the new schema
      for (const objectIndex in oldObjects) {
        const oldObject = oldObjects[objectIndex];
        const newObject = newObjects[objectIndex];
        newObject.fullName = `${oldObject.firstName} ${oldObject.lastName}`;
      }
    }
  },
};
// pass the configuration object with the updated 'schemaVersion' and 'migration' function to createRealmContext()
createRealmContext(config);

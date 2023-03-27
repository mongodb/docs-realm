class Person extends Realm.Object<Person> {
  _id!: string;
  fullName!: string;
  age!: number;

  static schema = {
    name: 'Person',
    properties: {
      _id: 'string',
      // rename the 'firstName' and 'lastName' property, to 'fullName' in the schema
      fullName: 'string',
      age: 'int',
    },
  };
}

const config = {
  schema: [Person],
  // increment the 'schemaVersion', since 'fullName' has replaced 'firstName' and 'lastName' in the schema
  schemaVersion: 4,
  migration: (oldRealm: Realm, newRealm: Realm) => {
    // only apply this change if upgrading schemaVersion
    if (oldRealm.schemaVersion < 4) {
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
const {RealmProvider} = createRealmContext(config);

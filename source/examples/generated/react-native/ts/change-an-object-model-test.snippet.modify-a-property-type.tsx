
class Person extends Realm.Object<Person> {
  _id: Realm.BSON.ObjectId = new Realm.BSON.ObjectId();
  firstName!: string;
  lastName!: string;
  age!: number;

  static schema = {
    name: 'Person',
    properties: {
      // update the data type of '_id' to be 'objectId' within the schema
      _id: 'objectId',
      firstName: 'string',
      lastName: 'string',
    },
  };
}

const config = {
  schema: [Person],
  // increment the 'schemaVersion', since the property type of '_id'
  // has been modified
  schemaVersion: 5,
  migration: (oldRealm: Realm, newRealm: Realm) => {
    if (oldRealm.schemaVersion < 2) {
      const oldObjects = oldRealm.objects(Person);
      const newObjects = newRealm.objects(Person);
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

// Pass the configuration object with the updated
// 'schemaVersion' and 'migration' function to createRealmContext()
const {RealmProvider} = createRealmContext(config);

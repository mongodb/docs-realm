class Person extends Realm.Object {
  static schema = {
    name: 'Person',
    properties: {
      firstName: 'string',
      lastName: 'string',
      // add a new property, 'age' to the schema
      age: 'int',
    },
  };
}

const config = {
  schema: [Person],
  // increment the 'schemaVersion', since 'age' has been added to the schema
  schemaVersion: 2,
};
// pass the configuration object with the updated 'schemaVersion' to createRealmContext()
createRealmContext(config);

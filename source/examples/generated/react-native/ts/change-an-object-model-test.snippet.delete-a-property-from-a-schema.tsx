class Person extends Realm.Object<Person> {
  _id!: string;
  firstName!: string;
  age!: number;

  static schema = {
    name: 'Person',
    properties: {
      _id: 'string',
      firstName: 'string',
      age: 'int',
    },
  };
}

const config = {
  schema: [Person],
  // increment the 'schemaVersion', since 'lastName' has been removed from the schema
  schemaVersion: 2,
};

// pass the configuration object with the updated 'schemaVersion' to createRealmContext()
const {RealmProvider} = createRealmContext(config);

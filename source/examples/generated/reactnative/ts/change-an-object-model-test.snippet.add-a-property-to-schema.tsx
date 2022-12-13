class Person extends Realm.Object {
  static schema = {
    name: 'Person',
    properties: {
      firstName: 'string',
      lastName: 'string',
      age: 'int',
    },
  };
}

const config = {
  schema: [Person],
  schemaVersion: 2,
};
const {RealmProvider} = createRealmContext(config);

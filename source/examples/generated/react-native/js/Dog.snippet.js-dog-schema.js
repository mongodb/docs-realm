class Dog extends Realm.Object {
  static schema = {
    name: 'Dog',
    properties: {
      name: 'string',
      owner: 'Person?',
      age: 'int?',
    },
  };
}

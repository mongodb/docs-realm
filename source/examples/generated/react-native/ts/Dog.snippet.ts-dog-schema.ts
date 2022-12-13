class Dog extends Realm.Object<Dog> {
  name!: string;
  owner?: Person;
  age?: number;

  static schema = {
    name: 'Dog',
    properties: {
      name: 'string',
      owner: 'Person?',
      age: 'int?',
    },
  };
}

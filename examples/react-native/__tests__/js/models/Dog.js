import Realm from 'realm';

// :snippet-start: js-dog-schema
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
// :snippet-end:
export default Dog;

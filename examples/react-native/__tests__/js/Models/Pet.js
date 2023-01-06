import Realm from 'realm';

// :snippet-start: ts-pet-schema
class Pet extends Realm.Object {
  static schema = {
    name: 'Pet',
    properties: {
      name: 'string',
      age: 'int',
      animalType: 'string?',
    },
  };
}
// :snippet-end:
export default Pet;

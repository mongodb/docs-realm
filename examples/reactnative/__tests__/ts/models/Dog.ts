import Realm from 'realm';
import Person from './Person';

// TODO: Replace `static schema` with TS-first models + realm-babel-plugin (https://www.npmjs.com/package/@realm/babel-plugin) approach once realm-babel-plugin version 0.1.2 releases with bug fixes
// :snippet-start: ts-dog-schema
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
// :snippet-end:
export default Dog;

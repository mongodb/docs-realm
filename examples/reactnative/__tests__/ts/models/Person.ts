import Realm from 'realm';

// TODO: Replace `static schema` with TS-first models + realm-babel-plugin (https://www.npmjs.com/package/@realm/babel-plugin) approach once realm-babel-plugin version 0.1.2 releases with bug fixes
// :snippet-start: ts-person-schema
class Person extends Realm.Object {
  static schema = {
    name: 'Person',
    properties: {
      name: 'string',
      age: 'int?',
    },
  };
}
// :snippet-end:
export default Person;

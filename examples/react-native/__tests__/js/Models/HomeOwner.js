import Realm from 'realm';

// :snippet-start: js-homeowner-schema
class HomeOwner extends Realm.Object {
  static schema = {
    name: 'HomeOwner',
    properties: {
      name: 'string',
      home: '{}',
    },
  };
}
// :snippet-end:
export default HomeOwner;

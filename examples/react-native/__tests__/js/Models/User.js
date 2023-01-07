import Realm from 'realm';

// :snippet-start: js-user-schema
class User extends Realm.Object {
  static schema = {
    name: 'User',
    properties: {
      name: 'string',
      birthdate: 'date',
      posts: 'Post[]',
    },
  };
}
// :snippet-end:

export default User;

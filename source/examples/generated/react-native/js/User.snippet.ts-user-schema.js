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

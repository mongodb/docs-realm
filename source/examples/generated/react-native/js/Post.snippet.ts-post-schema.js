class Post extends Realm.Object {
  static schema = {
    name: 'Post',
    properties: {
      title: 'string',
    },
  };
}

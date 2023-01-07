class Post extends Realm.Object<Post> {
  title!: string;
  static schema = {
    name: 'Post',
    properties: {
      title: 'string',
    },
  };
}

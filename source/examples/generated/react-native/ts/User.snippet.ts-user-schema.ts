class User extends Realm.Object<User> {
  name!: string;
  birthdate!: Date;
  posts!: Realm.List<Post>;

  static schema = {
    name: 'User',
    properties: {
      name: 'string',
      birthdate: 'date',
      posts: 'Post[]',
    },
  };
}

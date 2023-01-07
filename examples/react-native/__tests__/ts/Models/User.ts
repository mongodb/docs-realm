import Realm from 'realm';
import Post from './Post';
// TODO: Replace `static schema` with TS-first models + realm-babel-plugin (https://www.npmjs.com/package/@realm/babel-plugin) approach once realm-babel-plugin version 0.1.2 releases with bug fixes
// :snippet-start: ts-user-schema
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
// :snippet-end:

export default User;

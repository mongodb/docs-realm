import Realm from 'realm';
// TODO: Replace `static schema` with TS-first models + realm-babel-plugin (https://www.npmjs.com/package/@realm/babel-plugin) approach once realm-babel-plugin version 0.1.2 releases with bug fixes
// :snippet-start: ts-post-schema
class Post extends Realm.Object<Post> {
  title!: string;
  static schema = {
    name: 'Post',
    properties: {
      title: 'string',
    },
  };
}
// :snippet-end:

export default Post;

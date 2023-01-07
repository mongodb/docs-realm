import Realm from 'realm';

// :snippet-start: js-post-schema
class Post extends Realm.Object {
  static schema = {
    name: 'Post',
    properties: {
      title: 'string',
    },
  };
}
// :snippet-end:

export default Post;

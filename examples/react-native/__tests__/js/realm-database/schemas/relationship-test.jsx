import React, {useState} from 'react';
import {Button, TextInput, View, Text} from 'react-native';
import {render, fireEvent, waitFor, act} from '@testing-library/react-native';
import Realm from 'realm';
import {createRealmContext} from '@realm/react';
import User from '../../Models/User';
import Post from '../../Models/Post';

const realmConfig = {
  schema: [User, Post],
  deleteRealmIfMigrationNeeded: true,
};

const {RealmProvider, useObject} = createRealmContext(realmConfig);

let assertionRealm;

// test describe block for the relationship page
describe('relationships tests', () => {
  beforeEach(async () => {
    // we will use this Realm for assertions to access Realm Objects outside of a Functional Component (like required by @realm/react)
    assertionRealm = await Realm.open(realmConfig);

    // delete every object in the realmConfig in the Realm to make test idempotent
    assertionRealm.write(() => {
      assertionRealm.delete(assertionRealm.objects(User));
      assertionRealm.delete(assertionRealm.objects(Post));

      const user1 = new User(assertionRealm, {
        _id: new Realm.BSON.ObjectId(),
        name: 'John Doe',
      });
      const post1 = new Post(assertionRealm, {
        _id: new Realm.BSON.ObjectId(),
        title: 'My First Post',
      });
      user1.posts.push(post1);
    });
  });
  afterAll(() => {
    if (!assertionRealm.isClosed) {
      assertionRealm.close();
    }
  });
  it('should dynamically obtain an inverse relationship', async () => {
    // :snippet-start: dynamically-obtain-inverse-relationship
    // :replace-start: {
    //  "terms": {
    //   " testID='nameInput'": "",
    //   " testID='createProfileButton'": ""
    //   }
    // }
    const PostItem = ({_id}) => {
      const post = useObject(Post, _id);
      const user = post?.linkingObjects('User', 'posts')[0];

      if (!post || !user) return <Text>The post or user could not be found</Text>;
      return (
        <View>
          <Text testID='postTitle'>Post title: {post.title}</Text>
          <Text testID='userName'>Post created by: {user.name}</Text>
        </View>
      );
    };
    // :replace-end:
    // :snippet-end:
    const postId = assertionRealm.objects(Post)[0]._id;
    console.log('postId', postId);
    const App = () => (
      <RealmProvider>
        <PostItem _id={postId} />
      </RealmProvider>
    );

    const {getByTestId} = render(<App />);

    await waitFor(() => {
      expect(getByTestId('postTitle')).toHaveTextContent('Post title: My First Post');
      expect(getByTestId('userName')).toHaveTextContent('Post created by: John Doe');
    });
  });
});

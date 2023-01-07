const PostItem = ({_id}: {_id: Realm.BSON.ObjectId}) => {
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

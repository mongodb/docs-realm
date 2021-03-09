const config = {
  schema: [DogSchema], // predefined schema
  sync: {
    user: app.currentUser,
    partitionValue: "MyPartitionValue",
    // The behavior to use when this is the first time opening a realm.
    newRealmFileBehavior: {
      type: "openImmediately",
    },
  },
};
const realm = await Realm.open(config);

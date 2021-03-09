const config = {
  schema: [DogSchema], // predefined schema
  sync: {
    user: app.currentUser,
    partitionValue: "MyPartitionValue",
    // The behavior to use when a realm file already exists locally,
    // i.e. you have previously opened the realm.
    existingRealmFileBehavior: {
      type: "downloadBeforeOpen",
    },
  },
};
const realm = await Realm.open(config);

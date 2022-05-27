var config = {
  schema: [DogSchema], // predefined schema
  sync: {
    user: app.currentUser,
    partitionValue: "MyPartitionValue",
    error: (_session, error) => {
      (error) => {
        console.log(error.name, error.message);
      };
    },
  },
};
const realm = await Realm.open(config);

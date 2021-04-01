var config = {
  schema: [DogSchema], // predefined schema
  sync: {
    user: app.currentUser,
    partitionValue: "MyPartitionValue",
  },
};
let realm = await Realm.open(config);
const syncSession = realm.syncSession;
const connectionState = syncSession.connectionState();

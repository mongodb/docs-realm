const config = {
  schema: [Car], // predefined schema
  sync: {
    user: user, // already logged in user
    partitionValue: "myPartition",
    existingRealmFileBehavior: {
      type: "openImmediately",
      timeOut: 1000,
      timeOutBehavior: "openLocalRealm",
    },
    newRealmFileBehavior: {
      type: "openImmediately",
      timeOut: 1000,
      timeOutBehavior: "openLocalRealm",
    },
  },
};

try {
  const realm = await Realm.open(config)
  const syncSession = realm.syncSession;
  const connectionState = syncSession.isConnected(); //`false` if offline
} catch (err) {
  console.error("failed to open realm", err.message);
}

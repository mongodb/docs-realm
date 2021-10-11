const realmFileBehavior = {
  type: "openImmediately",
  timeOut: 1000,
  timeOutBehavior: "openLocalRealm",
};

const config = {
  schema: [Car], // predefined schema
  sync: {
    user: app.currentUser, // already logged in user
    partitionValue: "myPartition",
    existingRealmFileBehavior: realmFileBehavior,
    newRealmFileBehavior: realmFileBehavior,
  },
};

try {
  const realm = await Realm.open(config);

  const syncSession = realm.syncSession;
  const connectionState = syncSession.isConnected(); //`false` if offline

  realm.close();
} catch (err) {
  console.error("failed to open realm", err.message);
}

const localConfig = {
  schema: [Car],
  path: "localOnly.realm",
};
const localRealm = await Realm.open(localConfig);

const syncedConfig = {
  schema: [Car], // predefined schema
  path: "copyLocalToSynced.realm", // must include in output configuration
  sync: {
    user: app.currentUser, // already logged in user
    partitionValue: "myPartition",
  },
};
localRealm.writeCopyTo(syncedConfig);
const syncedRealm = await Realm.open(syncedConfig);

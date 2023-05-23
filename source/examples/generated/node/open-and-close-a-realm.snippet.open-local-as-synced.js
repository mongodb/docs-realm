const localConfig = {
  schema: [Car],
  path: "localOnly.realm",
};
const localRealm = await Realm.open(localConfig);

const syncedConfig = {
  schema: [Car],
  path: "copyLocalToSynced.realm",
  sync: {
    user: app.currentUser,
    partitionValue: "myPartition",
  },
};

localRealm.writeCopyTo(syncedConfig);
const syncedRealm = await Realm.open(syncedConfig);

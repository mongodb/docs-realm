const openRealmBehaviorConfig = {
  type: "downloadBeforeOpen",
  timeOut: 1000,
  timeOutBehavior: "openLocalRealm",
};

const config = {
  schema: [Car], // predefined schema
  sync: {
    user: await getUser(), // already logged in user
    partitionValue: "myPartition",
    existingRealmFileBehavior: openRealmBehaviorConfig,
    newRealmFileBehavior: openRealmBehaviorConfig,
  },
};

try {
  const realm = await Realm.open(config);

  realm.close();
} catch (err) {
  console.error("failed to open realm", err.message);
}

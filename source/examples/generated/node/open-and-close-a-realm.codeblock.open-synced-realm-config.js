const realmFileBehavior = {
  type: "downloadBeforeOpen",
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

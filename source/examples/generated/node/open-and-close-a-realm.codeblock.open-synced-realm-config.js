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

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

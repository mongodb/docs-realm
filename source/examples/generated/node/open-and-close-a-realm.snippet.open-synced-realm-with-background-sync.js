const openRealmBehaviorConfig = {
  type: "openImmediately",
};

const config = {
  schema: [Car], // predefined schema
  sync: {
    user: await getUser(),
    partitionValue: "myPartition",
    newRealmFileBehavior: openRealmBehaviorConfig,
    existingRealmFileBehavior: openRealmBehaviorConfig,
  },
};

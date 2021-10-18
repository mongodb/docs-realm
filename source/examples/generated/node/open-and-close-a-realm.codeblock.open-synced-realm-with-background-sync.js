const OpenRealmBehaviorConfiguration = {
  type: "openImmediately",
};

const config = {
  schema: [Car], // predefined schema
  sync: {
    user: app.currentUser,
    partitionValue: "myPartition",
    newRealmFileBehavior: OpenRealmBehaviorConfiguration,
    existingRealmFileBehavior: OpenRealmBehaviorConfiguration,
  },
};

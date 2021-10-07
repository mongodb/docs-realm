const config = {
  schema: [Car], // predefined schema
  sync: {
    user: user, // already logged in user
    partitionValue: "myPartition",
  },
};

try {
  const realm = await Realm.open(config)
} catch (err) {
  console.error("failed to open realm", err.message);
}

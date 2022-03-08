const config = {
  schema: [Car], // predefined schema
  sync: {
    user: app.currentUser, // already logged in user
    partitionValue: "myPartition",
  },
};

try {
  const realm = await Realm.open(config);

  realm.close();
} catch (err) {
  console.error("failed to open realm", err.message);
}

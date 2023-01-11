// Synchronously open a local realm file with a particular path & predefined Car schema
try {
  const realm = new Realm({
    path: "myrealm",
    schema: [Car],
  });
} catch (err) {
  console.error("Failed to open the realm", err.message);
}

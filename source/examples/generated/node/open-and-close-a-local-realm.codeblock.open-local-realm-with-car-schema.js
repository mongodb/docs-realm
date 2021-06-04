// Open a local realm file with a particular path & predefined Car schema
const realm;
try {
  realm = await Realm.open({
    path: "myrealm",
    schema: [Car],
  });
} catch (err) {
  console.error("Failed to open the realm", err.message);
}

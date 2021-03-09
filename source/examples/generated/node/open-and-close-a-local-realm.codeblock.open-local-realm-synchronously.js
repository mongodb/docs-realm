// Synchronously open a local realm file with a particular path & predefined Car schema
const realm = new Realm({
  path: "myrealm",
  schema: [Car],
});

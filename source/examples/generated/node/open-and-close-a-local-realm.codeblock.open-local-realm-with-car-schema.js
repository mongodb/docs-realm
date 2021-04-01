// Open a local realm file with a particular path & predefined Car schema
const realm = await Realm.open({
  path: "myrealm",
  schema: [Car],
});

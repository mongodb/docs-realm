// Open a local realm file with a particular path & predefined CarSchema
const realm = await Realm.open({
  path: "myrealm",
  schema: [CarSchema],
});

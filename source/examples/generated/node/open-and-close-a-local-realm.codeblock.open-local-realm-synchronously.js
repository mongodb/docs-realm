// Synchronously open a local realm file with a particular path & predefined CarSchema
const realm = new Realm({
  path: "myrealm",
  schema: [CarSchema],
});

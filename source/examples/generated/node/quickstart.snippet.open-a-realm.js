const realm = await Realm.open({
  path: "realm-files/myrealm",
  schema: [TaskSchema],
});

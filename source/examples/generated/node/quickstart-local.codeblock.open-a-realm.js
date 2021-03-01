const realm = await Realm.open({
  path: "myrealm",
  schema: [TaskSchema],
});

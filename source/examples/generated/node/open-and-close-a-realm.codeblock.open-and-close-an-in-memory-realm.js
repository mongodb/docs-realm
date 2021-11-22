const realm = await Realm.open({
  inMemory: true,
  schema: [TaskSchema],
});

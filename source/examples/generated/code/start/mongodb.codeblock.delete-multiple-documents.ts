const result: Realm.Services.MongoDB.DeleteResult = await plants.deleteMany(
  {
    _partition: "Store 51",
  }
);
console.log(result);
type UpdateResult = Realm.Services.MongoDB.UpdateResult<BSON.ObjectId>;
const result: UpdateResult = await plants.updateMany(
  { _partition: "Store 47" },
  { $set: { _partition: "Store 51" } }
);
console.log(result);
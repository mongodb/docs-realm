type UpdateResult = Realm.Services.MongoDB.UpdateResult<BSON.ObjectId>;
const result: UpdateResult = await plants.updateOne(
  { name: "petunia" },
  { $set: { sunlight: "partial" } }
);
console.log(result);
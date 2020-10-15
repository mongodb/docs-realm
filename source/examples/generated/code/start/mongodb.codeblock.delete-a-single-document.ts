const result: Realm.Services.MongoDB.DeleteResult = await plants.deleteOne({
  color: "green",
});
console.log(result);
realm.write(() => {
  // remove the compass from characterOne's inventory by calling `Realm.Set.delete()` within a write transaction
  characterOne.inventory.delete("compass");
});

realm.write(() => {
  // remove the compass from characterOne's inventory by calling `set.delete()` within a write transaction
  characterOne.inventory.delete("compass");
});


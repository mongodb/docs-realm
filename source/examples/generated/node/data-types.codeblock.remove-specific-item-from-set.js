realm.write(() => {
  // remove the compass from playerOne's inventory by calling `set.delete()` within a write transaction
  playerOne.inventory.delete("compass");
});


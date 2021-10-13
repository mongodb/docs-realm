realm.write(() => {
  // clear all data from the inventory slot of the playerTwo by calling `set.clear()` in a write transaction
  playerTwo.inventory.clear();
});

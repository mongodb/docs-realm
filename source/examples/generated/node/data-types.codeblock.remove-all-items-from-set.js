realm.write(() => {
  // clear all data from the inventory slot of the characterTwo by calling `set.clear()` in a write transaction
  characterTwo.inventory.clear();
});

realm.write(() => {
  // clear all data from the inventory slot of the hunter by calling `set.clear()` in a write transaction
  hunter.inventory.clear();
});

realm.write(() => {
  // clear all data from the items slot of the hunter by calling `set.clear()` in a write transaction
  hunter.inventory.clear();
});

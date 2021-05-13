realm.write(() => {
  // remove the compass from link's inventory by calling `set.delete()` within a write transaction
  link.inventory.delete("compass");
});


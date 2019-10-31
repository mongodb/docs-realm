realm.write(() => {
  // Delete all of Ali's dogs.
  realm.delete(ali.dogs);
  // Delete Ali.
  realm.delete(ali);
});

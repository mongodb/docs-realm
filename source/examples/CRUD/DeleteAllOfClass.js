realm.write(() => {
  // Delete all instances of Dog from the realm.
  realm.deleteModel("Dog");
});

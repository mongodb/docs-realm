realm.write(() => {
  // Add a new person to the realm. Since nobody with ID 1234
  // has been added yet, this adds the instance to the realm.
  const drew = realm.create("Person", { id: 1234, name: "Drew" }, true);

  // Judging by the ID, it's the same person, just with a different name.
  // When the third parameter (`update`) is true, you overwrite the original
  // entry (i.e. Drew -> Andy).
  const andy = realm.create("Person", { id: 1234, name: "Andy" }, true);
});

realm.write(() => {
  // Add a new person to the realm. Since nobody with ID 1234
  // has been added yet, this adds the instance to the realm.
  const drew = realm.create("Person", { id: 1234, name: "Drew" }, "modified");

  // Judging by the ID, it's the same person, just with a different name.

  // If an object exists, setting the third parameter (`updateMode`) to
  // "modified" only updates properties that have changed, resulting in
  // faster operations.
  const andy = realm.create("Person", { id: 1234, name: "Andy" }, "modified");
});

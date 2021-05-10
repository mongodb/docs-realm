// update an existing home, from an existing city in the database
realm.write(() => {
  // use the `put()` method to add a field to a dictionary property
  summerHillHouse.home.put({ style: "Victorian" });
  // alternatively, set a field of a dictionary through dot notation
  summerHillHouse.color = "brown";
});

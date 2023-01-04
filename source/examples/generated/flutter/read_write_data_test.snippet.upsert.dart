final id = ObjectId();
// Add Anakin Skywalker to the realm with primary key `id`
final anakin = Person(
  id,
  "Anakin Skywalker",
);
realm.write(() {
  realm.add<Person>(anakin);
});

// Update Anakin Skywalker's name to Darth Vader in the realm
// with primary key `id`
final darthVader = Person(id, 'Darth Vader');
realm.write(() {
  realm.add<Person>(darthVader, update: true);
});

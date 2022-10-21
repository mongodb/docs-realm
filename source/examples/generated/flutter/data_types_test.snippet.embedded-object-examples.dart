// Both parent and embedded objects in schema
final realm = Realm(Configuration.local([Person.schema, Address.schema]));

// Create an embedded object.
Address joesHome = Address("500 Dean Street", "Brooklyn", "NY", "USA");
Person joe = Person("Joe", address: joesHome);
realm.write(() => realm.add(joe));

// Update an embedded object property.
realm.write(() {
  joe.address?.street = "800 Park Place";
});

// Query a collection of embedded objects.
// You must access the embedded object through the parent RealmObject type.
final peopleWithNewYorkHomes = realm.query<Person>("address.state = 'NY'");

// Overwrite an embedded object.
// Also deletes original embedded object from realm.
Address joesNewHome = Address("12 Maple Way", "Toronto", "ON", "Canada");
realm.write(() {
  joe.address = joesNewHome;
});

// Delete an embedded object. Deleting the parent object also deletes the embedded object.
realm.write(() => realm.delete(joe));

final config = Configuration.local([Person.schema, Scooter.schema]);
final realm = Realm(config);
// Add scooter ownded by Mace Windu
final maceWindu = Person(ObjectId(), "Mace", "Windu");
final purpleScooter =
    Scooter(ObjectId(), "Purple scooter", owner: maceWindu);
realm.write(() {
  realm.add(purpleScooter);
});

// Create frozen snapshot of realm
final frozenRealm = realm.freeze();

// Update data in the realm
final quiGonJinn = Person(ObjectId(), "Qui-Gon", "Jinn");
realm.write(() {
  purpleScooter.owner = quiGonJinn;
});

// Data changes not in the frozen snapshot
final purpleScooterFrozen =
    frozenRealm.query<Scooter>("name == \$0", ["Purple scooter"]).first;
print(purpleScooterFrozen.owner!.firstName); // prints 'Mace'
realm.write(() {
  realm.deleteAll<Person>();
  realm.deleteAll<Scooter>();
});
realm.close();

// You must also close the frozen realm before exiting the process
frozenRealm.close();

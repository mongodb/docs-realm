final config = Configuration.local([Person.schema, Scooter.schema]);
Realm realm = Realm(config);
// Add scooter ownded by Mace Windu
final maceWindu = Person(1, "Mace", "Windu");
final purpleScooter = Scooter(1, "Purple scooter", owner: maceWindu);
realm.write(() {
  realm.add(purpleScooter);
});

// Create frozen snapshot of realm
final frozenRealm = realm.freeze();

// Update data in the realm
final quiGonJinn = Person(2, "Qui-Gon", "Jinn");
realm.write(() {
  purpleScooter.owner = quiGonJinn;
});

// Data changes not in the frozen snapshot
final purpleScooterFrozen = frozenRealm.find<Scooter>(1);
print(purpleScooterFrozen!.owner!.firstName); // prints 'Mace'
realm.close();

// You must also close the frozen realm before exiting the process
frozenRealm.close();

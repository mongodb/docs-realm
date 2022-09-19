// Use Realm objects like regular objects.
auto dog = Dog { .name = "Rex", .age = 1 };

std::cout << "dog: " << dog << "\n";

// Get the default Realm with compile time schema checking.
auto realm = realm::open<Person, Dog>();

// Persist your data in a write transaction
realm.write([&realm, &dog] {
    realm.add(dog);
});

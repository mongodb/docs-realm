// Create a Realm object like a regular object.
auto dog = Dog { .name = "Rex", .age = 1 };

std::cout << "dog: " << dog << "\n";

// Open a realm with compile-time schema checking.
auto realm = realm::open<Dog>();

// Persist your data in a write transaction
realm.write([&realm, &dog] {
    realm.add(dog);
});

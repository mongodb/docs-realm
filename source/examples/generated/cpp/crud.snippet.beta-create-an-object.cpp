// Create a Realm object like a regular object.
auto dog = Dog { .name = "Rex", .age = 1 };

std::cout << "dog: " << dog.name << "\n";

// Open a realm with compile-time schema checking.
auto config = realm::db_config();
auto realm = db(std::move(config));

// Persist your data in a write transaction
// Optionally return the managed object to work with it immediately
auto managedDog = realm.write([&] {
    return realm.add(std::move(dog));
});

// Create a Realm object like a regular object.
auto dog = Dog { .name = "Rex", .age = 1 };

std::cout << "dog: " << dog.name << "\n";

// Open a realm with compile-time schema checking.
auto config = db_config();
auto realm = db(std::move(config));

// Persist your data in a write transaction
realm.write([&] {
    realm.add(std::move(dog));
});

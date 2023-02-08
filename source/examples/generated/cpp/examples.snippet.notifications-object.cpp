auto realm = realm::open<Person, Dog>();

auto dog = Dog { .name = "Max" };

// Create an object in the realm.
realm.write([&realm, &dog] {
    realm.add(dog);
});

//  Set up the listener & observe object notifications.
auto token = dog.observe([&](auto&& change) {
    try {
        if (change.error) {
            rethrow_exception(change.error);
        }
        if (change.is_deleted) {
            std::cout << "The object was deleted.\n";
        } else {
            for (auto& propertyChange : change.property_changes) {
                std::cout << "The object's " << propertyChange.name << " property has changed.\n"; 
                auto newPropertyValue = std::get<std::string>(*propertyChange.new_value);
                std::cout << "The new value is " << newPropertyValue << "\n";
            }
        }
    } catch (std::exception const& e) {
        std::cerr << "Error: " << e.what() << "\n";
    }
});

// Update the dog's name to see the effect.
realm.write([&dog, &realm] {
    dog.name = "Wolfie";
});

// Deleting the object triggers a delete notification.
realm.write([&dog, &realm] {
    realm.remove(dog);
});
// Refresh the realm after the change to trigger the notification.
realm.refresh();

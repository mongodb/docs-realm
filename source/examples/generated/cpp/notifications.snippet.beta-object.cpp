auto config = realm::db_config();
auto realm = db(std::move(config));

auto dog = Notification_Dog { .name = "Max" };

// Create an object in the realm.
realm.write([&] {
    realm.add(std::move(dog));
});

auto dogs = realm.objects<Notification_Dog>();
auto specificDog = dogs[0];
//  Set up the listener & observe object notifications.
auto token = specificDog.observe([&](auto&& change) {
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
realm.write([&] {
    specificDog.name = "Wolfie";
});

// Deleting the object triggers a delete notification.
realm.write([&] {
    realm.remove(specificDog);
});

// Refresh the realm after the change to trigger the notification.
realm.refresh();

// Unregister the token when done observing.
token.unregister();

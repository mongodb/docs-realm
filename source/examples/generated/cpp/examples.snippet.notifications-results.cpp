// Get a results collection to observe
auto dogs = realm.objects<Dog>();
//  Set up the listener & observe results notifications.
auto token = dogs.observe([&](auto&& changes) {
    try {
        if (changes.collection_root_was_deleted) {
            std::cout << "The collection was deleted.\n";
        } else {
            // Handle deletions, then insertions, then modifications.
            for (auto& resultsChange : changes.deletions) {
                std::cout << "The object at index " << std::to_string(resultsChange) << " was deleted\n";
            }
            for (auto& resultsChange : changes.insertions) {
                std::cout << "The object at index " << std::to_string(resultsChange) << " was inserted\n";
            }
            for (auto& resultsChange : changes.modifications) {
                std::cout << "The object at index " << std::to_string(resultsChange) << " was modified\n";
            }
        }
    } catch (std::exception const& e) {
        std::cerr << "Error: " << e.what() << "\n";
    }
});

// Delete and then add an object to see deletions and insertions.
realm.write([&dog1, &dog2, &realm] {
    realm.remove(dog1);
    realm.add(dog2);
});

// Modify an object to see a modification.
realm.write([&dog2, &realm] {
    dog2.age = 2;
});

// Refresh the realm after the change to trigger the notification.
realm.refresh();

// Unregister the token when done observing.
token.unregister();

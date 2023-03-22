#include <catch2/catch_test_macros.hpp>
#include <string>
#include <cpprealm/sdk.hpp>

struct Dog : realm::object<Dog>
{
    realm::persisted<std::string> name;
    realm::persisted<int64_t> age;

    static constexpr auto schema = realm::schema("Dog",
                                                 realm::property<&Dog::name>("name"),
                                                 realm::property<&Dog::age>("age"));
};

struct Person : realm::object<Person>
{
    realm::persisted<std::string> _id;
    realm::persisted<std::string> name;
    realm::persisted<int64_t> age;
    realm::persisted<std::optional<Dog>> dog;

    static constexpr auto schema = realm::schema("Person",
                                                 realm::property<&Person::_id, true>("_id"),
                                                 realm::property<&Person::name>("name"),
                                                 realm::property<&Person::age>("age"),
                                                 realm::property<&Person::dog>("dog"));
};

TEST_CASE("object notification", "[notification]")
{
    // :snippet-start: object
    auto realm = realm::open<Person, Dog>();

    auto dog = Dog{.name = "Max"};

    // Create an object in the realm.
    realm.write([&realm, &dog]
                { realm.add(dog); });

    //  Set up the listener & observe object notifications.
    auto token = dog.observe([&](auto &&change)
                             {
        try {
            // :snippet-start: property-changes
            if (change.error) {
                rethrow_exception(change.error);
            }
            if (change.is_deleted) {
                std::cout << "The object was deleted.\n";
            } else {
                for (auto& propertyChange : change.property_changes) {
                    std::cout << "The object's " << propertyChange.name << " property has changed.\n"; 
                    CHECK(propertyChange.name == "name"); // :remove:
                    auto newPropertyValue = std::get<std::string>(*propertyChange.new_value);
                    std::cout << "The new value is " << newPropertyValue << "\n";
                    CHECK(newPropertyValue == "Wolfie"); // :remove:
                }
            }
            // :snippet-end:
        } catch (std::exception const& e) {
            std::cerr << "Error: " << e.what() << "\n";
        } });

    // Update the dog's name to see the effect.
    realm.write([&dog, &realm]
                { dog.name = "Wolfie"; });

    // Deleting the object triggers a delete notification.
    realm.write([&dog, &realm]
                { realm.remove(dog); });
    // Refresh the realm after the change to trigger the notification.
    realm.refresh();

    // :snippet-start: unregister
    // Unregister the token when done observing.
    token.unregister();
    // :snippet-end:
    // :snippet-end:
}

TEST_CASE("results notification", "[notification]")
{
    auto realm = realm::open<Dog>();

    auto dog1 = Dog{.name = "Max"};
    auto dog2 = Dog{.name = "Maui"};

    // Create an object in the realm.
    realm.write([&realm, &dog1]
                { realm.add(dog1); });

    // :snippet-start: results
    // Get a results collection to observe
    auto dogs = realm.objects<Dog>();
    //  Set up the listener & observe results notifications.
    auto token = dogs.observe([&](auto &&changes)
                              {
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
        } });

    // Delete and then add an object to see deletions and insertions.
    realm.write([&dog1, &dog2, &realm]
                {
        realm.remove(dog1);
        realm.add(dog2); });

    // Modify an object to see a modification.
    realm.write([&dog2, &realm]
                { dog2.age = 2; });

    // Refresh the realm after the change to trigger the notification.
    realm.refresh();

    // Unregister the token when done observing.
    token.unregister();
    // :snippet-end:
    // Clean up after the test
    realm.write([&dog2, &realm]
                { realm.remove(dog2); });
}

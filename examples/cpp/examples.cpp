#include <catch2/catch_test_macros.hpp>
#include <chrono>
#include <string>
#include <thread>

// :snippet-start: includes
#include <cpprealm/sdk.hpp>
// :snippet-end:

// :snippet-start: define-models
// Define your models like regular structs.
struct Dog : realm::object {
    realm::persisted<std::string> name;
    realm::persisted<int> age;

    static constexpr auto schema = realm::schema("Dog",
        realm::property<&Dog::name>("name"),
        realm::property<&Dog::age>("age"));
};

struct Person : realm::object {
    realm::persisted<std::string> _id;
    realm::persisted<std::string> name;
    realm::persisted<int> age;

    // Create relationships by pointing an Object field to another Class
    realm::persisted<std::optional<Dog>> dog;

    static constexpr auto schema = realm::schema("Person",
        realm::property<&Person::_id, true>("_id"), // primary key
        realm::property<&Person::name>("name"),
        realm::property<&Person::age>("age"),
        realm::property<&Person::dog>("dog"));
};
// :snippet-end:

TEST_CASE("first test case", "[test]") {
    // :snippet-start: usage
    // Use Realm objects like regular objects.
    auto dog = Dog { .name = "Rex", .age = 1 };
    
    std::cout << "dog: " << dog << "\n";

    // Get the default Realm with compile time schema checking.
    auto realm = realm::open<Person, Dog>();

    // Persist your data in a write transaction
    realm.write([&realm, &dog] {
        realm.add(dog);
    });
    // :snippet-end:
}

#if 0
// Can't currently get this to work.
TEST_CASE("live objects", "[test]") {
    // Open the default realm.
    auto realm = realm::open<Person, Dog>();

    auto dog = Dog { .name = "Max" };

    // Create a dog in the realm.
    realm.write([&realm, &dog] {
        realm.add(dog);
    });

    //  Set up the listener & observe object notifications.
    auto token = dog.observe<Dog>([](auto&& change) {
        try {
            if (change.error) {
                rethrow_exception(change.error);
            }
            if (change.is_deleted) {
                std::cout << "The object was deleted.\n";
            } else {
                std::cout << "The object changed\n";
            }
        } catch (std::exception const& e) {
            std::cerr << "Error: " << e.what() << "\n";
        }
    });

    // Update the dog's name to see the effect.
    realm.write([&dog, &realm] {
        dog.name = "Wolfie";
    });
}
#endif

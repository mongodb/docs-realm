#include <catch2/catch_test_macros.hpp>
#include <cpprealm/sdk.hpp>
#include <string>

// Define your models like regular structs.
struct Dog : realm::object {
    realm::persisted<std::string> name;
    realm::persisted<int> age;

    using schema = realm::schema<"Dog",
        realm::property<"name", &Dog::name>,
        realm::property<"age", &Dog::age>
    >;
};

struct Person : realm::object {
    realm::persisted<std::string> _id;
    realm::persisted<std::string> name;
    realm::persisted<int> age;

    // Create relationships by pointing an Object field to another Class
    realm::persisted<std::optional<Dog>> dog;

    using schema = realm::schema<"Person",
        realm::property<"_id", &Person::_id, true>, // primary key
        realm::property<"name", &Person::name>,
        realm::property<"age", &Person::age>,
        realm::property<"dog", &Person::dog>
    >;
};

TEST_CASE("first test case", "[test]") {
    // Use them like regular objects.
    auto dog = Dog { .name = "Rex", .age = 1 };
    
    std::cout << "dog: " << dog << "\n";

    // Get the default Realm with compile time schema checking.
    auto realm = realm::open<Person, Dog>();

    // Persist your data easily with a write transaction
    realm.write([&realm, &dog] {
        realm.add(dog);
    });

    // Update the model
    realm.write([&dog] {
        dog.name = "Wolfie";
    });
}

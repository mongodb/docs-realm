#include <catch2/catch_test_macros.hpp>
#include <cpprealm/sdk.hpp>

// :snippet-start: define-models
// :snippet-start: single-object-model
struct Dog : realm::object<Dog>
{
    realm::persisted<std::string> name;
    realm::persisted<int64_t> age;

    static constexpr auto schema = realm::schema("Dog",
                                                 realm::property<&Dog::name>("name"),
                                                 realm::property<&Dog::age>("age"));
};
// :snippet-end:

struct Person : realm::object<Person>
{
    realm::persisted<std::string> _id;
    realm::persisted<std::string> name;
    realm::persisted<int64_t> age;

    // Create relationships by pointing an Object field to another Class
    realm::persisted<std::optional<Dog>> dog;

    // :snippet-start: define-a-schema
    static constexpr auto schema = realm::schema("Person",
                                                 realm::property<&Person::_id, true>("_id"), // primary key
                                                 realm::property<&Person::name>("name"),
                                                 realm::property<&Person::age>("age"),
                                                 realm::property<&Person::dog>("dog"));
    // :snippet-end:
};
// :snippet-end:

TEST_CASE("create a dog", "[write]")
{
    // :snippet-start: create-an-object
    // Create a Realm object like a regular object.
    auto dog = Dog{.name = "Rex", .age = 1};

    std::cout << "dog: " << dog << "\n";

    // Open a realm with compile-time schema checking.
    auto realm = realm::open<Dog>();

    // Persist your data in a write transaction
    realm.write([&realm, &dog]
                { realm.add(dog); });
    // :snippet-end:
    auto dogsCount = realm.objects<Dog>().size();
    SECTION("Test code example functions as intended")
    {
        REQUIRE(dogsCount >= 1);
    }
    // :snippet-start: delete-an-object
    realm.write([&realm, &dog]
                { realm.remove(dog); });
    // :snippet-end:
    auto updatedDogsCount = realm.objects<Dog>().size();
    REQUIRE(updatedDogsCount < dogsCount);
}

TEST_CASE("update a dog", "[write][update]")
{
    auto dog = Dog{.name = "Maui", .age = 1};

    auto realm = realm::open<Dog>();

    realm.write([&realm, &dog]
                { realm.add(dog); });
    SECTION("Test code example functions as intended")
    {
        // :snippet-start: update-an-object
        // Query for the object you want to update
        auto dogs = realm.objects<Dog>();
        // auto dogsNamedMaui = dogs.where("name == $0", {"Maui"});
        auto dogsNamedMaui = dogs.where([](auto &dog)
                                        { return dog.name == "Maui"; });
        CHECK(dogsNamedMaui.size() >= 1);
        // Access an object in the results set.
        auto maui = dogsNamedMaui[0];
        // :remove-start:
        int64_t dogAge = 1;
        REQUIRE(maui.age == dogAge);
        // :remove-end:

        std::cout << "Dog " << maui.name << " is " << maui.age << " years old\n";

        // Assign a new value to a member of the object in a write transaction
        int64_t newAge = 2;
        realm.write([&realm, &maui, &newAge]
                    { maui.age = newAge; });
        // :snippet-end:
        auto updatedMaui = dogsNamedMaui[0];
        std::cout << "Dog " << updatedMaui.name << " is " << updatedMaui.age << " years old\n";
        REQUIRE(updatedMaui.age == newAge);
    }
    // Clean up after test
    realm.write([&realm, &dog]
                { realm.remove(dog); });
}
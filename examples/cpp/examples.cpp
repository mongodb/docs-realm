#include <catch2/catch_test_macros.hpp>
#include <chrono>
#include <string>
#include <thread>
#include <future>
#include "testHelpers.hpp"

// :snippet-start: includes
#include <cpprealm/sdk.hpp>
// :snippet-end:

static std::string APP_ID = "cpp-tester-uliix";

struct SyncDog : realm::object<SyncDog> {
    realm::persisted<realm::uuid> _id;
    realm::persisted<std::string> name;
    realm::persisted<int64_t> age;

    static constexpr auto schema = realm::schema("SyncDog",
        realm::property<&SyncDog::_id, true>("_id"),
        realm::property<&SyncDog::name>("name"),
        realm::property<&SyncDog::age>("age"));
};

// :snippet-start: define-models
// :snippet-start: single-object-model
struct Dog : realm::object<Dog> {
    realm::persisted<std::string> name;
    realm::persisted<int64_t> age;

    static constexpr auto schema = realm::schema("Dog",
        realm::property<&Dog::name>("name"),
        realm::property<&Dog::age>("age"));
};
// :snippet-end:

struct Person : realm::object<Person> {
    realm::persisted<int64_t> _id;
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
    // Clean up after the test
    realm.write([&realm, &dog] {
        realm.remove(dog);
    });
}

TEST_CASE("create a dog", "[write]") {
    // :snippet-start: create-an-object
    // Create a Realm object like a regular object.
    auto dog = Dog { .name = "Rex", .age = 1 };
    
    std::cout << "dog: " << dog << "\n";

    // Open a realm with compile-time schema checking.
    auto realm = realm::open<Dog>();

    // Persist your data in a write transaction
    realm.write([&realm, &dog] {
        realm.add(dog);
    });
    // :snippet-end:
    auto dogsCount = realm.objects<Dog>().size();
    SECTION("Test code example functions as intended") {
        REQUIRE(dogsCount >= 1);
    }
    // :snippet-start: delete-an-object
    realm.write([&realm, &dog] {
        realm.remove(dog);
    });
    // :snippet-end:
    auto updatedDogsCount = realm.objects<Dog>().size();
    REQUIRE(updatedDogsCount < dogsCount);
}

TEST_CASE("update a dog", "[write][update]") {
    auto dog = Dog { .name = "Maui", .age = 1 };

    auto realm = realm::open<Dog>();

    realm.write([&realm, &dog] {
        realm.add(dog);
    });
    SECTION("Test code example functions as intended") {
        // :snippet-start: update-an-object
        // Query for the object you want to update
        auto dogs = realm.objects<Dog>();
        // auto dogsNamedMaui = dogs.where("name == $0", {"Maui"});
        auto dogsNamedMaui = dogs.where([](auto &dog) {
            return dog.name == "Maui";
        });
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
        realm.write([&realm, &maui, &newAge] {
            maui.age = newAge;
        });
        // :snippet-end:
        auto updatedMaui = dogsNamedMaui[0];
        std::cout << "Dog " << updatedMaui.name << " is " << updatedMaui.age << " years old\n";
        REQUIRE(updatedMaui.age == newAge);
    }
    // Clean up after test
    realm.write([&realm, &dog] {
        realm.remove(dog);
    });
}

TEST_CASE("open a default realm", "[realm]") {
    // :snippet-start: open-default-realm
    // Get the default Realm with compile-time schema checking.
    auto realm = realm::open<Person, Dog>();
    // :snippet-end:
}

#if 0
TEST_CASE("open a realm at a path", "[realm]") {
    // Construct an arbitrary path to use in the example
        // :snippet-start: open-realm-at-path
    auto relative_realm_path = "custom_path_directory/";
    std::filesystem::create_directories(relative_realm_path); // :remove:
    // Construct a path, and then convert it to a string so you can append a name for the realm file
    auto path = std::filesystem::current_path().append(relative_realm_path).string();
    /* Add a name for the file. When you provide a path, the `db_config` 
     * constructor removes the last path element and makes that 
     * the realm file name. */
    path = path + "dog_objects";
    auto config = realm::db_config{ path = path };
    auto realm = realm::open<Dog>(config);
    // :snippet-end:
    SECTION("Test code example functions as intended + teardown") {
        // Write something to the realm to confirm this worked as expected.
        auto dog = Dog { .name = "Maui", .age = 2 };
        realm.write([&realm, &dog] {
            realm.add(dog);
        });
        auto dogs = realm.objects<Dog>();
        auto dog_count = dogs.size();
        REQUIRE(dog_count >= 1);
        // Clean up after test
        realm.write([&realm, &dog] {
            realm.remove(dog);
        });
    }
}
#endif

TEST_CASE("open a synced realm", "[realm][sync]") {
    // :snippet-start: open-a-synced-realm
    // :snippet-start: connect-app-services
    auto app = realm::App(APP_ID);
    // :snippet-end:
    // Ensure anonymous authentication is enabled in the App Services App
    auto user = app.login(realm::App::credentials::anonymous()).get_future().get();
    auto sync_config = user.flexible_sync_configuration();
    // Note that get_future().get() blocks this thread until the promise - 
    // in this case, the task kicked off by the call to async_open - is resolved
    auto synced_realm_ref = realm::async_open<SyncDog>(sync_config).get_future().get();
    // async_open gives us a thread-safe reference to the synced realm, which 
    // we need to resolve() before we can safely use the realm on this thread.
    auto realm = synced_realm_ref.resolve();
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

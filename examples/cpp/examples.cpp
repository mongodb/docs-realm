#include <catch2/catch_test_macros.hpp>
#include <chrono>
#include <string>
#include <thread>
#include <future>

// :snippet-start: includes
#include <cpprealm/sdk.hpp>
// :snippet-end:

static std::string APP_ID = "cpp-tester-uliix";

struct SyncDog : realm::object {
    realm::persisted<realm::uuid> _id;
    realm::persisted<std::string> name;
    realm::persisted<int> age;

    static constexpr auto schema = realm::schema("SyncDog",
        realm::property<&SyncDog::_id, true>("_id"),
        realm::property<&SyncDog::name>("name"),
        realm::property<&SyncDog::age>("age"));
};

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

TEST_CASE("open a default realm", "[realm]") {
    // :snippet-start: open-default-realm
    // Get the default Realm with compile-time schema checking.
    auto realm = realm::open<Person, Dog>();
    // :snippet-end:
}

TEST_CASE("open a realm at a path", "[realm]") {
    // :snippet-start: open-realm-at-path
    std::string path = std::filesystem::current_path();
    realm::db_config config = { path = path };
    auto realm = realm::open<Person, Dog>(config);
    // :snippet-end:
}

TEST_CASE("open a synced realm", "[realm, sync]") {
    // :snippet-start: open-a-synced-realm
    auto app = realm::App(APP_ID);
    auto user = app.login(realm::App::Credentials::anonymous()).get_future().get();
    auto sync_config = user.flexible_sync_configuration();
    auto synced_realm_ref = realm::async_open<SyncDog>(sync_config).get_future().get();
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

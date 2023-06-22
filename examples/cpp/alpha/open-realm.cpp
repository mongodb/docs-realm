#include <catch2/catch_test_macros.hpp>
#include <future>

// :snippet-start: includes
#include <cpprealm/sdk.hpp>
// :snippet-end:

static const std::string APP_ID = "cpp-tester-uliix";

struct Dog : realm::object<Dog> {
    realm::persisted<std::string> name;
    realm::persisted<int64_t> age;

    static constexpr auto schema = realm::schema("Dog",
        realm::property<&Dog::name>("name"),
        realm::property<&Dog::age>("age"));
};

struct Person : realm::object<Person> {
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

struct SyncDog : realm::object<SyncDog> {
    realm::persisted<realm::uuid> _id;
    realm::persisted<std::string> name;
    realm::persisted<int64_t> age;

    static constexpr auto schema = realm::schema("SyncDog",
        realm::property<&SyncDog::_id, true>("_id"),
        realm::property<&SyncDog::name>("name"),
        realm::property<&SyncDog::age>("age"));
};

TEST_CASE("open a default realm", "[realm]") {
    // :snippet-start: open-default-realm
    // Get the default Realm with compile-time schema checking.
    auto realm = realm::open<Person, Dog>();
    // :snippet-end:
}

TEST_CASE("open a realm at a path", "[realm]") {
    // Construct an arbitrary path to use in the example
    // :snippet-start: open-realm-at-path
    auto relative_realm_path_directory = "custom_path_directory/";
    std::filesystem::create_directories(relative_realm_path_directory); // :remove:
    // Construct a path
    std::filesystem::path path = std::filesystem::current_path().append(relative_realm_path_directory);
    // Add a name for the realm file
    path = path.append("dog_objects");
    // Add the .realm extension
    path = path.replace_extension("realm");
    // Open a realm at the path
    auto realm = realm::open<Dog>({ path });
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

TEST_CASE("open a synced realm", "[realm][sync]") {
    // :snippet-start: open-a-synced-realm
    auto app = realm::App(APP_ID);
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
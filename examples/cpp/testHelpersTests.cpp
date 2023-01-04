#include <catch2/catch_test_macros.hpp>

#include "testHelpers.hpp"

struct SyncDog : realm::object {
    realm::persisted<realm::uuid> _id;
    realm::persisted<std::string> name;
    realm::persisted<int> age;

    static constexpr auto schema = realm::schema("SyncDog",
        realm::property<&SyncDog::_id, true>("_id"),
        realm::property<&SyncDog::name>("name"),
        realm::property<&SyncDog::age>("age"));
};

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
    realm::persisted<std::optional<Dog>> dog;
    static constexpr auto schema = realm::schema("Person",
        realm::property<&Person::_id, true>("_id"), // primary key
        realm::property<&Person::name>("name"),
        realm::property<&Person::age>("age"),
        realm::property<&Person::dog>("dog"));
};

TEST_CASE("removeAll removes all", "[meta]") {
    auto realm = realm::open<Person, Dog, SyncDog>();
    realm.write([&realm] {
        realm.add(Dog { .name = "Rex", .age = 1 });
        realm.add(Person { ._id = "123", .name = "Ali", .age = 1 });
        realm.add(SyncDog { ._id = realm::uuid{}, .name = "Cyber Rex", .age = 1 });
    });
    REQUIRE(realm.objects<Dog>().size() > 0);
    REQUIRE(realm.objects<Person>().size() > 0);
    REQUIRE(realm.objects<SyncDog>().size() > 0);
    removeAll(realm);
    REQUIRE(realm.objects<Dog>().size() == 0);
    REQUIRE(realm.objects<Person>().size() == 0);
    REQUIRE(realm.objects<SyncDog>().size() == 0);
}

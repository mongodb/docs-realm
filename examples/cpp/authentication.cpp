#include <catch2/catch_test_macros.hpp>
#include <string>
#include <future>

#include <cpprealm/sdk.hpp>

static std::string APP_ID = "cpp-tester-uliix";
static std::string USER_EMAIL = "test@test.com";
static std::string USER_PASSWORD = "password1234";

struct SyncDog : realm::object {
    realm::persisted<realm::uuid> _id;
    realm::persisted<std::string> name;
    realm::persisted<int> age;

    static constexpr auto schema = realm::schema("SyncDog",
        realm::property<&SyncDog::_id, true>("_id"),
        realm::property<&SyncDog::name>("name"),
        realm::property<&SyncDog::age>("age"));
};

TEST_CASE("open a synced realm", "[realm, sync]") {
    auto app = realm::App(APP_ID);
    // 
    auto user = app.login(realm::App::Credentials::username_password(USER_EMAIL, USER_PASSWORD))
    .get_future().get();

    std::cout << "User is: " << user.state() << "\n";

    // auto sync_config = user.flexible_sync_configuration();
    // // Note that get_future().get() blocks this thread until the promise - 
    // // in this case, the task kicked off by the call to async_open - is resolved
    // auto synced_realm_ref = realm::async_open<SyncDog>(sync_config).get_future().get();
    // // async_open gives us a thread-safe reference to the synced realm, which 
    // // we need to resolve() before we can safely use the realm on this thread.
    // auto realm = synced_realm_ref.resolve();
}
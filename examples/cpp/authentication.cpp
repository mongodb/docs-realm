#include <catch2/catch_test_macros.hpp>
#include <string>
#include <future>

#include <cpprealm/sdk.hpp>

TEST_CASE("create and log in a user", "[realm]") {
    // :snippet-start: register-user
    const std::string APP_ID = "cpp-tester-uliix";
    const std::string USER_EMAIL = "testUser@mongodb.com";
    const std::string USER_PASSWORD = "password1234";

    auto app = realm::App(APP_ID);

    app.register_user(USER_EMAIL, USER_PASSWORD).get_future().get();
    // :snippet-end:

    // :snippet-start: log-user-in
    std::promise<realm::User> app_user;

    app.login(realm::App::Credentials::username_password(USER_EMAIL, USER_PASSWORD), [&](auto realm_user, auto err){
        app_user.set_value(realm_user);
    });

    auto user = app_user.get_future().get();
    // :snippet-end:

    CHECK(user.state() == realm::User::state::logged_in);

    // TODO: delete test users. Should probably be added to the end of `examples.cpp`.
    // auto result = user.call_function("deleteAllUsers", {realm::bson::BsonDocument({{"name", "john"}})}).get_future().get();
}

#include <catch2/catch_test_macros.hpp>
#include <string>
#include <future>

#include <cpprealm/sdk.hpp>

TEST_CASE("create and log in a user", "[realm]") {
    // :snippet-start: register-user
    const std::string APP_ID = "cpp-tester-uliix";

    auto app = realm::App(APP_ID);

    std::string user_email = "testUser@mongodb.com";
    std::string user_password = "password1234";

    app.register_user(user_email, user_password).get_future().get();
    // :snippet-end:

    // :snippet-start: log-user-in
    auto user = app.login(realm::App::Credentials::username_password(USER_EMAIL, USER_PASSWORD))
        .get_future().get();
    // :snippet-end:

    // :snippet-start: log-user-out
    user.log_out().get_future().get();
    // :snippet-end:
}

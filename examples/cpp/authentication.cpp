#include <catch2/catch_test_macros.hpp>
#include <string>
#include <future>
#include <random>

#include <cpprealm/sdk.hpp>

auto random_number() {
    static std::random_device rd;
    static std::mt19937 generator(rd());
    static std::uniform_int_distribution<int64_t> distribution;
    return distribution(generator);
}

auto random_string() {
    return std::to_string(random_number());
}

auto INSERT_APP_ID_HERE = "cpp-tester-uliix";

TEST_CASE("create and log in an email/password user", "[realm][sync]") {
    // :snippet-start: register-user
    auto app = realm::App(INSERT_APP_ID_HERE);

    auto user_email = "testUser" + random_string() + "@example.com";
    auto user_password = "password1234";

    app.register_user(user_email, user_password).get_future().get();
    // :snippet-end:

    // :snippet-start: log-user-in
    auto user = app.login(realm::App::credentials::username_password(user_email, user_password))
        .get_future().get();
    // :snippet-end:
    REQUIRE(!user.access_token().empty());

    // :snippet-start: log-user-out
    user.log_out().get_future().get();
    // :snippet-end:
    CHECK(user.state() == realm::user::state::logged_out);
}

TEST_CASE("create and log in an anonymous user", "[realm][sync]") {
    // :snippet-start: anonymous-login
    auto app = realm::App(INSERT_APP_ID_HERE);

    auto user = app.login(realm::App::credentials::anonymous()).get_future().get();
    // :snippet-end:
    REQUIRE(!user.access_token().empty());
    user.log_out().get_future().get();
    CHECK(user.state() == realm::user::state::removed);
}

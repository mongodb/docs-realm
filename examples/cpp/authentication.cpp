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

TEST_CASE("create and log in a user", "[realm][sync]") {
    // :snippet-start: register-user
    const std::string APP_ID = "cpp-tester-uliix";

    auto app = realm::App(APP_ID);

    auto user_email = "testUser" + random_string() + "@example.com";
    auto user_password = "password1234";

    app.register_user(user_email, user_password).get_future().get();
    // :snippet-end:

    // :snippet-start: log-user-in
    auto user = app.login(realm::App::Credentials::username_password(user_email, user_password))
        .get_future().get();
    // :snippet-end:

    // :snippet-start: log-user-out
    user.log_out().get_future().get();
    // :snippet-end:
}

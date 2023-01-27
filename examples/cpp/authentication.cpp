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

TEST_CASE("test API key authentication", "[realm][sync]") {
    auto API_KEY = "test passed locally but redacted for commit pending how to handle secrets";

    // :snippet-start: api-key
    auto app = realm::App(INSERT_APP_ID_HERE);

    // :remove-start:
    // The test below succeeded locally with the valid API_KEY - commenting out for 
    // CI until we have a chance to discuss how to handle a secret here.
    // :remove-end:
    // :uncomment-start:
    // auto user = app.login(realm::App::credentials::api_key(API_KEY)).get_future().get();
    // :uncomment-end:
    // :snippet-end:
    // REQUIRE(!user.access_token().empty());
    // user.log_out().get_future().get();
    // CHECK(user.state() == realm::user::state::logged_out);
}

TEST_CASE("test custom function authentication", "[realm][sync]") {
    // :snippet-start: custom-function
    realm::bson::BsonDocument params = {{ "username", "bob" }};

    auto app = realm::App(INSERT_APP_ID_HERE);

    auto user = app.login(realm::App::credentials::function(params)).get_future().get();
    // :snippet-end:
    REQUIRE(!user.access_token().empty());
    user.log_out().get_future().get();
    CHECK(user.state() == realm::user::state::logged_out);
}

TEST_CASE("test custom JWT authentication", "[realm][sync]") {
    // :snippet-start: custom-jwt
    auto token = "<jwt>";

    // :remove-start:
    // We expect a failure in Swift & don't actually test that this works, 
    // so going with the same approach here
    // :remove-end:
    // :uncomment-start:
    // auto app = realm::App(INSERT_APP_ID_HERE);

    // auto user = app.login(realm::App::credentials::custom(token)).get_future().get();
    // :uncomment-end:
    // :snippet-end:
}

TEST_CASE("test get user access token", "[realm][sync]") {
    auto app = realm::App(INSERT_APP_ID_HERE);

    auto user = app.login(realm::App::credentials::anonymous()).get_future().get();

    // :snippet-start: get-user-access-token
    // With a logged-in user, refresh the custom user data to refresh the auth session
    user.refresh_custom_user_data().get_future().get();

    // Then get the user's access token
    auto userAccessToken = user.access_token();
    // :snippet-end:
    REQUIRE(!userAccessToken.empty());
    user.log_out().get_future().get();
    CHECK(user.state() == realm::user::state::removed);
}

TEST_CASE("sign in with Facebook", "[realm][sync]") {
    // :snippet-start: facebook
    auto app = realm::App(INSERT_APP_ID_HERE);

    auto accessToken = "<token>";

    // :remove-start:
    // Flutter does not test the third-party login credentials so taking this approach here
    // :remove-end:
    // :uncomment-start:
    //auto user = app.login(realm::App::credentials::facebook(accessToken)).get_future().get();
    // :uncomment-end:
    // :snippet-end:
}

TEST_CASE("sign in with apple", "[realm][sync]") {
    // :snippet-start: apple
    auto app = realm::App(INSERT_APP_ID_HERE);

    auto idToken = "<token>";

    // :remove-start:
    // Flutter does not test the third-party login credentials so taking this approach here
    // :remove-end:
    // :uncomment-start:
    //auto user = app.login(realm::App::credentials::apple(idToken)).get_future().get();
    // :uncomment-end:
    // :snippet-end:
}

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

auto const INSERT_APP_ID_HERE = "cpp-tester-uliix";

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
    REQUIRE(user.access_token().empty());
}

TEST_CASE("create and log in an anonymous user", "[realm][sync]") {
    // :snippet-start: anonymous-login
    auto app = realm::App(INSERT_APP_ID_HERE);

    auto user = app.login(realm::App::credentials::anonymous()).get_future().get();
    // :snippet-end:
    REQUIRE(!user.access_token().empty());
    user.log_out().get_future().get();
    REQUIRE(user.access_token().empty());
}

TEST_CASE("test custom function authentication", "[realm][sync]") {
    // :snippet-start: custom-function
    // Custom function authentication takes a BSON Document with parameters.
    // The parameter details vary depending on how you define your custom authentication function.
    realm::bson::BsonDocument params = {{ "username", "bob" }};

    auto app = realm::App(INSERT_APP_ID_HERE);

    auto user = app.login(realm::App::credentials::function(params)).get_future().get();
    // :snippet-end:
    REQUIRE(!user.access_token().empty());
    user.log_out().get_future().get();
    REQUIRE(user.access_token().empty());
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
    REQUIRE(user.access_token().empty());
}

// The following funcs aren't actually being called anywhere so we're not
// really testing these. But having these as funcs lets us check that the
// syntax is valid and compiles, at least.
void testAPIKeyAuthSyntax() {
    auto API_KEY = "this was tested with a valid API key when written";

    // :snippet-start: api-key
    auto app = realm::App(INSERT_APP_ID_HERE);

    auto user = app.login(realm::App::credentials::api_key(API_KEY)).get_future().get();
    // :snippet-end:
}

void testCustomJWTAuthSyntax() {
    // :snippet-start: custom-jwt
    auto token = "<jwt>";

    auto app = realm::App(INSERT_APP_ID_HERE);

    auto user = app.login(realm::App::credentials::custom(token)).get_future().get();
    // :snippet-end:
}

void testSignInWithFacebookAuthSyntax() {
    // :snippet-start: facebook
    auto app = realm::App(INSERT_APP_ID_HERE);

    auto accessToken = "<token>";

    auto user = app.login(realm::App::credentials::facebook(accessToken)).get_future().get();
    // :snippet-end:
}

void testSignInWithAppleAuthSyntax() {
    // :snippet-start: apple
    auto app = realm::App(INSERT_APP_ID_HERE);

    auto idToken = "<token>";

    auto user = app.login(realm::App::credentials::apple(idToken)).get_future().get();
    // :snippet-end:
}

void testSignInWithGoogleAuthCodeSyntax() {
    auto myAuthCode = "some auth code string";
    auto auth_code = realm::App::credentials::auth_code{myAuthCode};

    // :snippet-start: google-auth-code
    auto app = realm::App(INSERT_APP_ID_HERE);
    
    // The auth_code below is the user's server auth code you got from Google
    auto user = app.login(realm::App::credentials::google(auth_code)).get_future().get();
    // :snippet-end:
}

void testSignInWithGoogleIdTokenSyntax() {
    auto myIdToken = "some ID token string";
    auto id_token = realm::App::credentials::id_token{myIdToken};

    // :snippet-start: google-id-token
    auto app = realm::App(INSERT_APP_ID_HERE);
    
    // The id_token below is the user's OpenID Connect id_token you got from the Google OAuth response
    auto user = app.login(realm::App::credentials::google(id_token)).get_future().get();
    // :snippet-end:
}

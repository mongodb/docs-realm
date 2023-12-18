#include <catch2/catch_test_macros.hpp>
#include <cpprealm/sdk.hpp>
#include <future>
#include <random>
#include <string>

auto random_number() {
  static std::random_device rd;
  static std::mt19937 generator(rd());
  static std::uniform_int_distribution<int64_t> distribution;
  return distribution(generator);
}

auto random_string() { return std::to_string(random_number()); }

static const std::string APP_ID = "cpp-tester-uliix";

TEST_CASE("create and log in an email/password user", "[realm][sync]") {
  // :snippet-start: beta-register-user
  auto appConfig = realm::App::configuration();
  appConfig.app_id = APP_ID;
  auto app = realm::App(appConfig);

  auto userEmail = "testUser" + random_string() + "@example.com";
  auto userPassword = "password1234";

  app.register_user(userEmail, userPassword).get();
  // :snippet-end:

  // :snippet-start: beta-log-user-in
  auto user = app.login(realm::App::credentials::username_password(
                            userEmail, userPassword))
                  .get();
  // :snippet-end:
  REQUIRE(!user.access_token().empty());

  // :snippet-start: log-user-out
  user.log_out().get();
  // :snippet-end:
  REQUIRE(user.access_token().empty());
}

TEST_CASE("create and log in an anonymous user", "[realm][sync]") {
  // :snippet-start: beta-anonymous-login
  auto appConfig = realm::App::configuration();
  appConfig.app_id = APP_ID;
  auto app = realm::App(appConfig);

  auto user = app.login(realm::App::credentials::anonymous()).get();
  // :snippet-end:
  REQUIRE(!user.access_token().empty());
  user.log_out().get();
  REQUIRE(user.access_token().empty());
}

TEST_CASE("test custom function authentication", "[realm][sync]") {
    // :snippet-start: beta-custom-function
    // Custom function authentication takes a BSON Document with parameters.
    // The parameter details vary depending on how you define your custom authentication function.
    realm::bson::BsonDocument params = {{ "username", "bob" }};

    auto appConfig = realm::App::configuration();
    appConfig.app_id = APP_ID;
    auto app = realm::App(appConfig);

    auto user = app.login(realm::App::credentials::function(params)).get();
    // :snippet-end:
    REQUIRE(!user.access_token().empty());
    user.log_out().get();
    REQUIRE(user.access_token().empty());
}

TEST_CASE("test get user access token", "[realm][sync]") {
  auto appConfig = realm::App::configuration();
  appConfig.app_id = APP_ID;
  auto app = realm::App(appConfig);

  auto user = app.login(realm::App::credentials::anonymous()).get();
  // :snippet-start: get-user-access-token
  // With a logged-in user, refresh the custom user data to refresh the auth
  // session
  user.refresh_custom_user_data().get();

  // Then get the user's access token
  auto userAccessToken = user.access_token();
  // :snippet-end:
  REQUIRE(!userAccessToken.empty());
  user.log_out().get();
  REQUIRE(user.access_token().empty());
}

// The following funcs aren't actually being called anywhere so we're not
// really testing these. But having these as funcs lets us check that the
// syntax is valid and compiles, at least.
void testAPIKeyAuthSyntax() {
  auto API_KEY = "this was tested with a valid API key when written";

  // :snippet-start: beta-api-key
  auto appConfig = realm::App::configuration();
  appConfig.app_id = APP_ID;
  auto app = realm::App(appConfig);

  auto user = app.login(realm::App::credentials::api_key(API_KEY)).get();
  // :snippet-end:
}

void testCustomJWTAuthSyntax() {
  // :snippet-start: beta-custom-jwt
  auto token = "<jwt>";

  auto appConfig = realm::App::configuration();
  appConfig.app_id = APP_ID;
  auto app = realm::App(appConfig);

  auto user = app.login(realm::App::credentials::custom(token)).get();
  // :snippet-end:
}

void testSignInWithFacebookAuthSyntax() {
  // :snippet-start: beta-facebook
  auto appConfig = realm::App::configuration();
  appConfig.app_id = APP_ID;
  auto app = realm::App(appConfig);

  auto accessToken = "<token>";

  auto user = app.login(realm::App::credentials::facebook(accessToken)).get();
  // :snippet-end:
}

void testSignInWithAppleAuthSyntax() {
  // :snippet-start: beta-apple
  auto appConfig = realm::App::configuration();
  appConfig.app_id = APP_ID;
  auto app = realm::App(appConfig);

  auto idToken = "<token>";

  auto user = app.login(realm::App::credentials::apple(idToken)).get();
  // :snippet-end:
}

void testSignInWithGoogleAuthCodeSyntax() {
    auto myAuthCode = "some auth code string";
    auto authCode = realm::App::credentials::auth_code{ myAuthCode };

    // :snippet-start: beta-google-auth-code
    auto appConfig = realm::App::configuration();
    appConfig.app_id = APP_ID;
    auto app = realm::App(appConfig);
    
    // The auth_code below is the user's server auth code you got from Google
    auto user = app.login(realm::App::credentials::google(authCode)).get();
    // :snippet-end:
}

void testSignInWithGoogleIdTokenSyntax() {
    auto myIdToken = "some ID token string";
    auto idToken = realm::App::credentials::id_token{ myIdToken };

    // :snippet-start: beta-google-id-token
    auto appConfig = realm::App::configuration();
    appConfig.app_id = APP_ID;
    auto app = realm::App(appConfig);
    
    // The id_token below is the user's OpenID Connect id_token you got from the Google OAuth response
    auto user = app.login(realm::App::credentials::google(idToken)).get();
    // :snippet-end:
}

TEST_CASE("get the current user", "[realm][sync]") {
  auto appConfig = realm::App::configuration();
  appConfig.app_id = APP_ID;
  auto app = realm::App(appConfig);
  auto user = app.login(realm::App::credentials::anonymous()).get();

  // :snippet-start: beta-get-current-user
  auto currentUser = app.get_current_user();
  // :snippet-end:

  REQUIRE(!currentUser.value().access_token().empty());
  user.log_out().get();
  REQUIRE(user.access_token().empty());
}

TEST_CASE("confirm the user is logged in", "[realm][sync]") {
  auto appConfig = realm::App::configuration();
  appConfig.app_id = APP_ID;
  auto app = realm::App(appConfig);
  // :snippet-start: check-user-is-logged-in
  auto user = app.login(realm::App::credentials::anonymous()).get();
  CHECK(user.is_logged_in());
  // :snippet-end:
  user.log_out().get();
  REQUIRE(user.access_token().empty());
}

#include <catch2/catch_test_macros.hpp>
#include <cpprealm/sdk.hpp>
#include <future>
#include <string>

static const std::string APP_ID = "cpp-tester-uliix";

// This test is currently commented out because the SDK has removed the
// exposed Core headers that gave it access to a BSON library.
// See PR https://github.com/realm/realm-cpp/pull/123/
// Per Lee, a separate project will create a C++ SDK BSON library, but in
// the meantime, I'll need to use some other library to make this test work.
// I need to figure out how to create BSON strings in C++ and pass them
// instead of using realm::bson::Bson for the params.
// TODO: Figure out what library to use and how to make this test/example work.
#if 0
TEST_CASE("call a function", "[realm][sync]") {
  // :snippet-start: call-a-function
  // Connect to an App Services App and authenticate a user
  // :snippet-start: connect-app-services
  auto appConfig = realm::App::configuration();
  appConfig.app_id = APP_ID;
  auto app = realm::App(appConfig);
  // :snippet-end:
  auto user = app.login(realm::App::credentials::anonymous()).get();
  auto sync_config = user.flexible_sync_configuration();

  // If a function takes arguments, pass them as BSON
  auto arg1 = realm::bson::Bson("john.smith");
  auto arg2 = realm::bson::Bson("@companyemail.com");

  // Call an App Services function as the logged-in user
  auto result = user.call_function("concatenate", {arg1, arg2}).get();

  // Verify that the result has a value
  CHECK(result);
  auto bsonResult = result.value();

  // Translate the BSON result back to a string
  auto resultString = std::string(bsonResult);
  // Prints "Calling the concatenate function returned
  // john.smith@companyemail.com."
  std::cout << "Calling the concatenate function returned " << resultString
            << ".\n";
  // :snippet-end:
  REQUIRE(resultString == "john.smith@companyemail.com");
}
#endif
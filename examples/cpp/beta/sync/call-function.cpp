#include <catch2/catch_test_macros.hpp>
#include <string>
#include <future>
#include <cpprealm/sdk.hpp>

static const std::string APP_ID = "cpp-tester-uliix";

TEST_CASE("call a function", "[realm][sync]")
{
    // :snippet-start: beta-call-a-function
    // Connect to an App Services App and authenticate a user
    // :snippet-start: connect-app-services
    auto app = realm::App(APP_ID);
    // :snippet-end:
    app.get_sync_manager().set_log_level(realm::logger::level::warn); // :remove:
    auto user = app.login(realm::App::credentials::anonymous()).get();
    auto sync_config = user.flexible_sync_configuration();

    // If a function takes arguments, pass them as BSON
    auto arg1 = realm::bson::Bson("john.smith");
    auto arg2 = realm::bson::Bson("@companyemail.com");

    // Call an App Services function as the logged-in user
    auto result = user.call_function("concatenate", { arg1, arg2 }).get();

    // Verify that the result has a value
    CHECK(result);
    auto bsonResult = result.value();

    // Translate the BSON result back to a string
    auto resultString = std::string(bsonResult);
    // Prints "Calling the concatenate function returned john.smith@companyemail.com."
    std::cout << "Calling the concatenate function returned " << resultString << ".\n";
    // :snippet-end:
    REQUIRE(resultString == "john.smith@companyemail.com");
}

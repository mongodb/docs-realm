#include <catch2/catch_test_macros.hpp>
#include <future>
#include <cpprealm/sdk.hpp>

static const std::string APP_ID = "cpp-tester-uliix";

TEST_CASE("custom user data", "[realm][sync]")
{
    auto appConfig = realm::App::configuration();
    appConfig.app_id = APP_ID;
    auto app = realm::App(appConfig);

    // :snippet-start: beta-create
    auto user = app.login(realm::App::credentials::anonymous()).get();

    // Functions take an argument of BsonArray, so initialize the custom data as a BsonDocument
    auto customDataBson = realm::bson::BsonDocument({{"userId", user.identifier()}, {"favoriteColor", "gold"}});

    // Call an Atlas Function to insert custom data for the user
    auto result = user.call_function("updateCustomUserData", { customDataBson }).get();
    // :snippet-end:
    CHECK(result);

    // :snippet-start: read
    // Custom user data could be stale, so refresh it before reading it
    user.refresh_custom_user_data().get();
    CHECK((*user.custom_data())["favoriteColor"] == "gold");
    // :snippet-end:

    // :snippet-start: update
    // Functions take an argument of BsonArray, so initialize the custom data as a BsonDocument
    auto updatedDataBson = realm::bson::BsonDocument({{"userId", user.identifier()}, { "favoriteColor", "black" }});

    // Call an Atlas Function to update custom data for the user
    auto updateResult = user.call_function("updateCustomUserData", { updatedDataBson }).get();

    // Refresh the custom user data before reading it to verify it succeeded
    user.refresh_custom_user_data().get();
    CHECK((*user.custom_data())["favoriteColor"] == "black");
    // :snippet-end:
    // :snippet-start: delete
    auto deleteResult = user.call_function("deleteCustomUserData", {}).get();
    // :snippet-end:
    CHECK(deleteResult);
}

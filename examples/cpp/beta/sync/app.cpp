#include <catch2/catch_test_macros.hpp>
#include <cpprealm/sdk.hpp>

static const std::string APP_ID = "cpp-tester-uliix";

TEST_CASE("test custom headers compile", "[realm][sync]") {
    // :snippet-start: set-custom-headers-for-app
    std::map<std::string, std::string> customHttpHeaders;
    customHttpHeaders.insert(std::pair<std::string, std::string>("CUSTOM_HEADER_NAME", "CUSTOM_HEADER_VALUE"));

    auto app = realm::App(APP_ID, std::nullopt, std::nullopt, customHttpHeaders);
    // :snippet-end:

    app.get_sync_manager().set_log_level(realm::logger::level::warn);

    auto user = app.login(realm::App::credentials::anonymous()).get();
    // :snippet-start: set-custom-headers-for-sync-config
    std::map<std::string, std::string> customHeaders;
    customHeaders.insert(std::pair<std::string, std::string>("CUSTOM_HEADER_NAME", "CUSTOM_HEADER_VALUE"));

    auto syncConfig = user.flexible_sync_configuration();
    syncConfig.set_custom_http_headers(customHeaders);
    // :snippet-end:
    REQUIRE(user.is_logged_in());
    user.log_out().get();
    REQUIRE(user.access_token().empty());
}

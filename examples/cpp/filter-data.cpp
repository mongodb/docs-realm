#include <catch2/catch_test_macros.hpp>
#include <string>
#include "testHelpers.hpp"
#include <cpprealm/sdk.hpp>

// :snippet-start: models
struct Item : realm::object<Item> {
    realm::persisted<std::string> name;
    realm::persisted<bool> isComplete;
    realm::persisted<std::optional<std::string>> assignee;
    realm::persisted<int64_t> progressMinutes;

    static constexpr auto schema = realm::schema("Item",
        realm::property<&Item::name>("name"),
        realm::property<&Item::isComplete>("isComplete"),
        realm::property<&Item::assignee>("assignee"),
        realm::property<&Item::progressMinutes>("progressMinutes"));
};

struct Project : realm::object<Project> {
    realm::persisted<std::string> name;
    realm::persisted<std::optional<Item>> items;

    static constexpr auto schema = realm::schema("Project",
        realm::property<&Project::name>("name"),
        realm::property<&Project::items>("items"));
};
// :snippet-end:

TEST_CASE("set up tests", "[write]") {

    SECTION("Test setup code functions as intended") {
        // :snippet-start: set-up-filter-data-tests
        auto realm = realm::open<Project, Item>();

        auto project = Project {
            .name = "New project"
        };

        auto item1 = Item {
            .name = "Save the cheerleader",
            .assignee = std::string("Peter"),
            .isComplete = false,
            .progressMinutes = 30
        };
        // :snippet-end:
    }
}
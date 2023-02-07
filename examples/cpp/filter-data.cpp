#include <catch2/catch_test_macros.hpp>
#include <string>
#include "testHelpers.hpp"
#include <cpprealm/sdk.hpp>

// :snippet-start: models
struct Item : realm::object<Item> {
    realm::persisted<std::string> name;
    realm::persisted<bool> isComplete;
    realm::persisted<std::optional<std::string>> assignee;
    realm::persisted<int64_t> priority;
    realm::persisted<int64_t> progressMinutes;

    static constexpr auto schema = realm::schema("Item",
        realm::property<&Item::name>("name"),
        realm::property<&Item::isComplete>("isComplete"),
        realm::property<&Item::assignee>("assignee"),
        realm::property<&Item::priority>("priority"),
        realm::property<&Item::progressMinutes>("progressMinutes"));
};

struct Project : realm::object<Project> {
    realm::persisted<std::string> name;
    realm::persisted<std::vector<Item>> items;

    static constexpr auto schema = realm::schema("Project",
        realm::property<&Project::name>("name"),
        realm::property<&Project::items>("items"));
};
// :snippet-end:

TEST_CASE("set up tests", "[write]") {
    // :snippet-start: set-up-filter-data-tests
    auto realm = realm::open<Project, Item>();

    auto item1 = Item {
        .name = "Save the cheerleader",
        .assignee = std::string("Peter"),
        .isComplete = false,
        .priority = 6,
        .progressMinutes = 30
    };

    auto project = Project {
        .name = "New project"
    };

    project.items.push_back(item1);

    realm.write([&project, &realm] {
        realm.add(project);
    });

    auto items = realm.objects<Item>();
    auto projects = realm.objects<Project>();
    // :snippet-end:

    CHECK(project.is_managed());
    CHECK(!item1.is_managed());

    CHECK(items.size() >= 1);
    CHECK(projects.size() >= 1);

    // :snippet-start: comparison-operators
    auto highPriorityItems = items.where([](auto &item) {
        return item.priority > 5;
    });

    auto quickItems = items.where([](auto &item) {
        return item.progressMinutes > 1 && item.progressMinutes < 30;
    });

    // :remove-start:
    // TODO: Add this back to the example, as well as a bullet to the page
    // describing the query, when the bug is fixed.
    // auto unassignedItems = items.where([](auto &item) {
    //     return item.assignee == std::nullopt;
    // });

    // :remove-end:
    auto aliOrJamieItems = items.where([](auto &item) {
        return item.assignee == std::string("Ali") || item.assignee == std::string("Jamie");
    });
    // :snippet-end:

    CHECK(highPriorityItems.size() >= 1);
    CHECK(quickItems.size() == 0);
    // CHECK(unassignedItems.size() == 0);
    CHECK(aliOrJamieItems.size() == 0);

    // :snippet-start: logical-operators
    auto completedItemsForAli = items.where([](auto &item) {
        return item.assignee == std::string("Ali") && item.isComplete == true;
    });
    // :snippet-end:
    CHECK(completedItemsForAli.size() == 0);

    // :snippet-start: string-operators
    auto containIe = items.where([](auto &item) {
        return item.name.contains("ie");
    });
    // :snippet-end:
    CHECK(containIe.size() == 0);

    realm.write([&project, &realm] {
        realm.remove(project);
    });
}

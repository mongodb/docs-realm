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

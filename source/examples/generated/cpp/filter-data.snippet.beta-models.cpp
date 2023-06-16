struct Beta_Item {
    std::string name;
    bool isComplete;
    std::optional<std::string> assignee;
    int64_t priority;
    int64_t progressMinutes;
};
REALM_SCHEMA(Beta_Item, name, isComplete, assignee, priority, progressMinutes)

struct Beta_Project {
    std::string name;
    std::vector<realm::experimental::link<Beta_Item>> items;
};
REALM_SCHEMA(Beta_Project, name, items)

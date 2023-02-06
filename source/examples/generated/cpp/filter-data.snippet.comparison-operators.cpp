auto highPriorityItems = items.where([](auto &item) {
    return item.priority > 5;
});

auto quickItems = items.where([](auto &item) {
    return item.progressMinutes > 1 && item.progressMinutes < 30;
});

auto aliOrJamieItems = items.where([](auto &item) {
    return item.assignee == std::string("Ali") || item.assignee == std::string("Jamie");
});

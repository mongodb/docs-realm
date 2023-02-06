auto completedItemsForAli = items.where([](auto &item) {
    return item.assignee == std::string("Ali") && item.isComplete == true;
});

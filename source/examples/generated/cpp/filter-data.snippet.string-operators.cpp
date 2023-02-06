auto containIe = items.where([](auto &item) {
    return item.name.contains("ie");
});

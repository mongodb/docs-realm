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

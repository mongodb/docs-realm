auto config = realm::db_config();
auto realm = db(std::move(config));

auto item1 = Item{.name = "Save the cheerleader",
                       .assignee = std::string("Peter"),
                       .isComplete = false,
                       .priority = 6,
                       .progressMinutes = 30};

auto project = Project{.name = "New project"};

project.items.push_back(&item1);

realm.write([&] { realm.add(std::move(project)); });

auto items = realm.objects<Item>();
auto projects = realm.objects<Project>();

auto companies = realm.objects<Company>();
auto namedDunderMifflin = companies.where("name == $0", {"Dunder Mifflin"});
CHECK(namedDunderMifflin.size() >= 1);
auto dunderMifflin = namedDunderMifflin[0];
std::cout << "Company named: " << dunderMifflin->name << "\n";

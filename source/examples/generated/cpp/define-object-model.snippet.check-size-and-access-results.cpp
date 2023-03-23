auto companies = realm.objects<Company>();
auto namedDunderMifflin = companies.where([](auto &company) {
    return company.name == "Dunder Mifflin";
});
CHECK(namedDunderMifflin.size() >= 1);
Company dunderMifflin = namedDunderMifflin[0];
std::cout << "Company named: " << dunderMifflin.name << "\n";

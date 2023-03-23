auto namedDunderMifflin = companies.where([](auto &company) {
    return company.name == "Dunder Mifflin";
});

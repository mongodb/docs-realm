struct Company : realm::object {
    realm::persisted<realm::uuid> _id;
    realm::persisted<std::string> name;
    // To-many relationships are a list, represented here as a
    // vector container whose value type is the Realm object
    // type that the list field links to.
    realm::persisted<std::vector<Employee>> employees;

    static constexpr auto schema = realm::schema("Company",
        realm::property<&Company::_id, true>("_id"),
        realm::property<&Company::name>("name"),
        realm::property<&Company::employees>("employees"));
};

struct Employee : realm::object<Employee> {
    realm::persisted<int64_t> _id;
    realm::persisted<std::string> firstName;
    realm::persisted<std::string> lastName;
    // Omitting the `realm::persisted` annotation means
    // realm ignores this property
    std::string jobTitle_notPersisted;

    // Your schema consists of properties that you want realm to store.
    // Omit properties that you want to ignore from the schema.
    static constexpr auto schema = realm::schema("Employee",
        realm::property<&Employee::_id, true>("_id"),
        realm::property<&Employee::firstName>("firstName"),
        realm::property<&Employee::lastName>("lastName"));
};

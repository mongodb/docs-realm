struct Employee : realm::object<Employee> {
    enum class WorkLocation {
        home, office
    };

    realm::persisted<int64_t> _id;
    realm::persisted<std::string> firstName;
    realm::persisted<std::string> lastName;
    realm::persisted<std::map<std::string, WorkLocation>> locationByDay;

    static constexpr auto schema = realm::schema("Employee",
        realm::property<&Employee::_id, true>("_id"),
        realm::property<&Employee::firstName>("firstName"),
        realm::property<&Employee::lastName>("lastName"),
        realm::property<&Employee::locationByDay>("locationByDay"));
};

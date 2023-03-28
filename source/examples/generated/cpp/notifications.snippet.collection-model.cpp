struct Person : realm::object<Person> {
    realm::persisted<std::string> name;
    realm::persisted<std::vector<Dog>> dogs;

    static constexpr auto schema = realm::schema("Person",
        realm::property<&Person::name>("name"),
        realm::property<&Person::dogs>("dogs"));
};

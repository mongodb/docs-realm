struct Dog : realm::object<Dog> {
    realm::persisted<std::string> name;
    realm::persisted<std::map<std::string, std::string>> favoriteParkByCity;

    static constexpr auto schema = realm::schema("Dog",
        realm::property<&Dog::name>("name"),
        realm::property<&Dog::favoriteParkByCity>("favoriteParkByCity"));
};

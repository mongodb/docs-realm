struct FavoriteToy : realm::object<FavoriteToy> {
    realm::persisted<realm::uuid> _id;
    realm::persisted<std::string> name;

    static constexpr auto schema = realm::schema("FavoriteToy",
        realm::property<&FavoriteToy::_id, true>("_id"),
        realm::property<&FavoriteToy::name>("name"));
};

struct Dog : realm::object<Dog> {
    realm::persisted<realm::uuid> _id;
    realm::persisted<std::string> name;
    realm::persisted<int64_t> age;
    // To-one relationship objects must be optional
    realm::persisted<std::optional<FavoriteToy>> favoriteToy;

    static constexpr auto schema = realm::schema("Dog",
        realm::property<&Dog::_id, true>("_id"),
        realm::property<&Dog::name>("name"),
        realm::property<&Dog::age>("age"),
        realm::property<&Dog::favoriteToy>("favoriteToy"));
};

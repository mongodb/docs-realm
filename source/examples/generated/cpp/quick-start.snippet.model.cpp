struct Todo : realm::object<Todo> {
    realm::persisted<realm::object_id> _id{realm::object_id::generate()};
    realm::persisted<std::string> name;
    realm::persisted<std::string> status;
    // The ownerId property stores the user.identifier() of a
    // logged-in user. Omit this property for the non-sync example.
    realm::persisted<std::string> ownerId;

    static constexpr auto schema = realm::schema("Todo",
        realm::property<&Todo::_id, true>("_id"),
        realm::property<&Todo::name>("name"),
        realm::property<&Todo::status>("status"),
        realm::property<&Todo::ownerId>("ownerId"));
};

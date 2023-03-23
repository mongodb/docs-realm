static constexpr auto schema = realm::schema("Person",
    realm::property<&Person::_id, true>("_id"), // primary key
    realm::property<&Person::name>("name"),
    realm::property<&Person::age>("age"),
    realm::property<&Person::dog>("dog"));

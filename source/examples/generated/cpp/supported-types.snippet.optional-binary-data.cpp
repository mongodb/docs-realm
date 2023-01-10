// When I try to declare an optional binary from this syntax, I get these two errors:
// Implicit instantiation of undefined template 'realm::type_info::persisted_type<realm::BinaryData>'
// Incomplete definition of type 'realm::type_info::persisted_type<realm::BinaryData>'
// In cpp/cpprealm/persisted.cpp at ln 128
// realm::persisted<std::optional<std::vector<std::uint8_t>>> optBinaryDataName;

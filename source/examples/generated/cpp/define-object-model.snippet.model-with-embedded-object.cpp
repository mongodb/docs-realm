// Inherit from realm::embedded_object to declare an embedded object
struct ContactDetails : realm::embedded_object {
    // Because ContactDetails is an embedded object, it cannot have its own _id
    // It does not have a lifecycle outside of the top-level object
    realm::persisted<std::string> emailAddress;
    realm::persisted<std::string> phoneNumber;
    // An embedded object can contain another embedded object
    // In this case, MailingAddress is also an embedded object
    realm::persisted<MailingAddress> mailingAddress;

    static constexpr auto schema = realm::schema("ContactDetails",
        realm::property<&ContactDetails::emailAddress>("emailAddress"),
        realm::property<&ContactDetails::phoneNumber>("phoneNumber"),
        realm::property<&ContactDetails::mailingAddress>("mailingAddress"));
};

struct Business : realm::object {
    realm::persisted<std::string> _id;
    realm::persisted<std::string> name;
    realm::persisted<ContactDetails> contactDetails;

    static constexpr auto schema = realm::schema("Business",
        realm::property<&Business::_id, true>("_id"),
        realm::property<&Business::name>("name"),
        realm::property<&Business::contactDetails>("contactDetails"));
};

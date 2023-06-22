auto config = realm::db_config();
auto realm = db(std::move(config));

auto contactDetails = ContactDetails {
    .emailAddress = "email@example.com",
    .phoneNumber = "123-456-7890"
};
auto business = Business();
business._id = realm::object_id::generate();
business.name = "MongoDB";
business.contactDetails = &contactDetails;

realm.write([&] {
    realm.add(std::move(business));
});

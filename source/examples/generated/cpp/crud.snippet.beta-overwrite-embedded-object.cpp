auto businesses = realm.objects<Business>();
auto mongoDBBusinesses = businesses.where([](auto &business) {
    return business.name == "MongoDB";
});
auto theMongoDB = mongoDBBusinesses[0];

realm.write([&] {
    auto newContactDetails = ContactDetails {
        .emailAddress = "info@example.com",
        .phoneNumber = "234-567-8901"
    };
    // Overwrite the embedded object
    theMongoDB.contactDetails = std::move(newContactDetails);
});

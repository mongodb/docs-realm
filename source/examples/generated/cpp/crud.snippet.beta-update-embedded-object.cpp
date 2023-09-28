auto managedBusinesses = realm.objects<Business>();
auto businessesNamedMongoDB = managedBusinesses.where([](auto &business) {
    return business.name == "MongoDB";
});
auto mongoDB = businessesNamedMongoDB[0];

realm.write([&] {
    mongoDB.contactDetails->emailAddress = "info@example.com";
});

std::cout << "New email address: " << mongoDB.contactDetails->emailAddress.detach() << "\n";

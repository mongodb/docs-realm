auto businesses = realm.objects<Business>();
auto mongoDBPointer = businesses[0];

realm.write([&realm, &mongoDBPointer] {
    auto newContactDetails = ContactDetails {
        .emailAddress = "info@example.com",
        .phoneNumber = "234-567-8901"
    };

    // Overwrite the embedded object
    mongoDBPointer.contactDetails = newContactDetails;
});

std::cout << "New email address: " << mongoDBPointer.contactDetails->emailAddress << "\n";

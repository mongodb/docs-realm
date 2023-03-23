auto businesses = realm.objects<Business>();
auto mongoDBPointer = businesses[0];

realm.write([&realm, &mongoDBPointer] {
    mongoDBPointer.contactDetails->emailAddress = "info@example.com";
});

std::cout << "New email address: " << mongoDBPointer.contactDetails->emailAddress << "\n";

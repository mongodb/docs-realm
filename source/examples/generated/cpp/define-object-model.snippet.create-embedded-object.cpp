auto realm = realm::open<Business, ContactDetails>();

auto business = Business { .name = "MongoDB" };
business.contactDetails = ContactDetails { 
    .emailAddress = "email@example.com", 
    .phoneNumber = "123-456-7890"
};

std::cout << "Business: " << business << "\n";

realm.write([&realm, &business] {
    realm.add(business);
});

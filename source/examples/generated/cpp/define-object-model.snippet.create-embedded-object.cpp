auto realm = realm::open<Business, ContactDetails>();

auto business = Business();
business._id = 789012;
business.name = "MongoDB";
business.contactDetails = ContactDetails { 
    .emailAddress = "email@example.com", 
    .phoneNumber = "123-456-7890"
};

realm.write([&realm, &business] {
    realm.add(business);
});

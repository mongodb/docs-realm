#include <catch2/catch_test_macros.hpp>
#include <string>
#include <cpprealm/sdk.hpp>

struct MailingAddress : realm::embedded_object {
    realm::persisted<std::string> streetAddress;
    realm::persisted<std::string> city;
    realm::persisted<std::string> state;
    realm::persisted<std::string> postalCode;
    realm::persisted<std::string> country;

    static constexpr auto schema = realm::schema("MailingAddress",
        realm::property<&MailingAddress::streetAddress>("streetAddress"),
        realm::property<&MailingAddress::city>("city"),
        realm::property<&MailingAddress::state>("state"),
        realm::property<&MailingAddress::postalCode>("postalCode"),
        realm::property<&MailingAddress::country>("country"));
};

// :snippet-start: model-with-embedded-object
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
// :snippet-end:

TEST_CASE("create an embedded object", "[model, write]") {
    auto realm = realm::open<Business, ContactDetails, MailingAddress>();

    auto business = Business { .name = "MongoDB" };
    business.contactDetails = ContactDetails { 
        .emailAddress = "email@example.com", 
        .phoneNumber = "123-456-7890", 
        .mailingAddress =  MailingAddress {
        .streetAddress = "123 Any Street",
        .city = "Any City",
        .state = "Any State",
        .postalCode = "12345",
        .country = "Some Country"
    }};
    
    std::cout << "Business: " << business << "\n";

    realm.write([&realm, &business] {
        realm.add(business);
    });
    auto businesses = realm.objects<Business>();
    auto businessCount = businesses.size();
    REQUIRE(businessCount <= 1);
    REQUIRE((*business.contactDetails).emailAddress == "email@example.com");
}
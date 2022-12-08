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

// :snippet-start: model-with-ignored-field
struct Employee : realm::object {
    realm::persisted<realm::uuid> _id;
    realm::persisted<std::string> firstName;
    realm::persisted<std::string> lastName;
    // Omitting the `realm::persisted` annotation means 
    // realm ignores this property
    std::string ignoredField;

    // Your schema consists of properties that you want realm to store. 
    // Omit properties that you want to ignore from the schema.
    static constexpr auto schema = realm::schema("Employee",
        realm::property<&Employee::_id, true>("_id"),
        realm::property<&Employee::firstName>("firstName"),
        realm::property<&Employee::lastName>("lastName"));
};
// :snippet-end:

// GPSCoordinates and PointOfInterest were for a relationships example
// But I can't currently get it to work.
struct GPSCoordinates: realm::object {
    realm::persisted<std::string> latitude;
    realm::persisted<std::string> longitude;

    static constexpr auto schema = realm::schema("GPSCoordinates",
        realm::property<&GPSCoordinates::latitude>("latitude"),
        realm::property<&GPSCoordinates::longitude>("longitude"));
};

struct PointOfInterest : realm::object {
    realm::persisted<realm::uuid> _id;
    realm::persisted<std::string> name;
    realm::persisted<std::optional<GPSCoordinates>> gpsCoordinates;

    static constexpr auto schema = realm::schema("PointOfInterest",
        realm::property<&PointOfInterest::_id, true>("_id"),
        realm::property<&PointOfInterest::name>("name"),
        realm::property<&PointOfInterest::gpsCoordinates>("gpsCoordinates"));
};

TEST_CASE("create an embedded object", "[model][write]") {
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
    auto mongoDBPointer = businesses[0];
    REQUIRE(businesses.size() >= 1);
    REQUIRE((*mongoDBPointer->contactDetails).emailAddress == "email@example.com");
}

TEST_CASE("create object with ignored property", "[model][write]") {
    auto realm = realm::open<Employee>();

    auto employee = Employee { 
        .firstName = "Leslie", 
        .lastName = "Knope", 
        .ignoredField = "Organizer-In-Chief" };

    realm.write([&realm, &employee] {
        realm.add(employee);
    });

    auto employees = realm.objects<Employee>();
    auto employeesNamedLeslie = employees.where("firstName == $0", {"Leslie"});
    CHECK(employeesNamedLeslie.size() >= 1);
    std::unique_ptr<Employee> leslieKnopePointer = employeesNamedLeslie[0];
    REQUIRE(employee.ignoredField == "Organizer-In-Chief");
    REQUIRE(leslieKnopePointer->ignoredField.empty());
};

#if 0
// Can't currently get this to work
TEST_CASE("create object with to-one relationship", "[model][write][relationship]") {
    auto realm = realm::open<PointOfInterest, GPSCoordinates>();

    auto gpsCoordinates = GPSCoordinates { .latitude = "36.0554", .longitude = "112.1401" };
    auto pointOfInterest = PointOfInterest { .name = "Grand Canyon Village" };
    pointOfInterest.gpsCoordinates = &gpsCoordinates;
    // pointOfInterest.gpsCoordinates = GPSCoordinates { .latitude = "36.0554", .longitude = "112.1401" };

    std::cout << "Point of Interest: " << pointOfInterest << "\n";

    realm.write([&realm, &pointOfInterest] {
        realm.add(pointOfInterest);
    });

    auto pointsOfInterest = realm.objects<PointOfInterest>();
    auto namedGrandCanyonVillage = pointsOfInterest.where("name == $0", {"Grand Canyon Village"});
    CHECK(namedGrandCanyonVillage.size() >= 1);
    std::unique_ptr<PointOfInterest> grandCanyonVillage = namedGrandCanyonVillage[0];
    std::cout << "Point of Interest: " << grandCanyonVillage->name << "\n";
    std::cout << "POI Coordinates: " << grandCanyonVillage->gpsCoordinates << "\n";
    // auto grandCanyonVillageCoordinates = (*grandCanyonVillage->gpsCoordinates).latitude;
};
#endif
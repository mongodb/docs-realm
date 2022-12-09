#include <catch2/catch_test_macros.hpp>
#include <string>
#include <cpprealm/sdk.hpp>

// :snippet-start: model-with-embedded-object
// Inherit from realm::embedded_object to declare an embedded object
struct ContactDetails : realm::embedded_object {
    // Because ContactDetails is an embedded object, it cannot have its own _id
    // It does not have a lifecycle outside of the top-level object
    realm::persisted<std::string> emailAddress;
    realm::persisted<std::string> phoneNumber;

    static constexpr auto schema = realm::schema("ContactDetails",
        realm::property<&ContactDetails::emailAddress>("emailAddress"),
        realm::property<&ContactDetails::phoneNumber>("phoneNumber"));
};

struct Business : realm::object {
    realm::persisted<std::string> _id;
    realm::persisted<std::string> name;
    // Unlike to-one relationships, an embedded object can be a required property
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

// :snippet-start: to-one-relationship
struct GPSCoordinates: realm::object {
    realm::persisted<double> latitude;
    realm::persisted<double> longitude;

    static constexpr auto schema = realm::schema("GPSCoordinates",
        realm::property<&GPSCoordinates::latitude>("latitude"),
        realm::property<&GPSCoordinates::longitude>("longitude"));
};

struct PointOfInterest : realm::object {
    realm::persisted<realm::uuid> _id;
    realm::persisted<std::string> name;
    // To-one relationship objects must be optional
    realm::persisted<std::optional<GPSCoordinates>> gpsCoordinates;

    static constexpr auto schema = realm::schema("PointOfInterest",
        realm::property<&PointOfInterest::_id, true>("_id"),
        realm::property<&PointOfInterest::name>("name"),
        realm::property<&PointOfInterest::gpsCoordinates>("gpsCoordinates"));
};
// :snippet-end:

TEST_CASE("create an embedded object", "[model][write]") {
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

TEST_CASE("create object with to-one relationship", "[model][write][relationship]") {
    auto realm = realm::open<PointOfInterest, GPSCoordinates>();

    auto gpsCoordinates = GPSCoordinates { .latitude = 36.0554, .longitude = 112.1401 };
    auto pointOfInterest = PointOfInterest { .name = "Grand Canyon Village" };
    pointOfInterest.gpsCoordinates = gpsCoordinates;

    realm.write([&realm, &pointOfInterest] {
        realm.add(pointOfInterest);
    });

    auto pointsOfInterest = realm.objects<PointOfInterest>();
    auto namedGrandCanyonVillage = pointsOfInterest.where("name == $0", {"Grand Canyon Village"});
    CHECK(namedGrandCanyonVillage.size() >= 1);
    auto grandCanyonVillage = namedGrandCanyonVillage[0];
    std::cout << "Point of Interest: " << grandCanyonVillage->name << "\n";
    REQUIRE(grandCanyonVillage->name == "Grand Canyon Village");
    auto grandCanyonVillageLatitude = *(*grandCanyonVillage->gpsCoordinates).value().latitude;
    std::cout << "POI Latitude: " << grandCanyonVillageLatitude << "\n";
    REQUIRE(grandCanyonVillageLatitude == 36.0554);
};

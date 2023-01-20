#include <catch2/catch_test_macros.hpp>
#include <string>
#include <cpprealm/sdk.hpp>

// :snippet-start: model-with-embedded-object
// Inherit from realm::embedded_object to declare an embedded object
struct ContactDetails : realm::embedded_object<ContactDetails> { // :emphasize:
    // Because ContactDetails is an embedded object, it cannot have its own _id
    // It does not have a lifecycle outside of the top-level object
    realm::persisted<std::string> emailAddress;
    realm::persisted<std::string> phoneNumber;

    static constexpr auto schema = realm::schema("ContactDetails",
        realm::property<&ContactDetails::emailAddress>("emailAddress"),
        realm::property<&ContactDetails::phoneNumber>("phoneNumber"));
};

struct Business : realm::object<Business> {
//    realm::persisted<std::string> _id;
    realm::persisted<std::string> name;
    // Unlike to-one relationships, an embedded object can be a required property
    realm::persisted<ContactDetails> contactDetails; // :emphasize:

    static constexpr auto schema = realm::schema("Business",
//        realm::property<&Business::_id, true>("_id"),
        realm::property<&Business::name>("name"),
        realm::property<&Business::contactDetails>("contactDetails")); // :emphasize:
};
// :snippet-end:

// :snippet-start: model-with-ignored-field
struct Employee : realm::object<Employee> {
//    realm::persisted<realm::uuid> _id;
    realm::persisted<std::string> firstName;
    realm::persisted<std::string> lastName;
    // Omitting the `realm::persisted` annotation means
    // realm ignores this property
    std::string jobTitle_notPersisted;

    // Your schema consists of properties that you want realm to store.
    // Omit properties that you want to ignore from the schema.
    static constexpr auto schema = realm::schema("Employee",
//        realm::property<&Employee::_id, true>("_id"),
        realm::property<&Employee::firstName>("firstName"),
        realm::property<&Employee::lastName>("lastName"));
};
// :snippet-end:
                                          
// :snippet-start: to-one-relationship
struct GPSCoordinates: realm::object<GPSCoordinates> {
    realm::persisted<double> latitude;
    realm::persisted<double> longitude;

    static constexpr auto schema = realm::schema("GPSCoordinates",
        realm::property<&GPSCoordinates::latitude>("latitude"),
        realm::property<&GPSCoordinates::longitude>("longitude"));
};

struct PointOfInterest : realm::object<PointOfInterest> {
//    realm::persisted<realm::uuid> _id;
    realm::persisted<std::string> name;
    // To-one relationship objects must be optional
    realm::persisted<std::optional<GPSCoordinates>> gpsCoordinates;

    static constexpr auto schema = realm::schema("PointOfInterest",
//        realm::property<&PointOfInterest::_id, true>("_id"),
        realm::property<&PointOfInterest::name>("name"),
        realm::property<&PointOfInterest::gpsCoordinates>("gpsCoordinates"));
};
// :snippet-end:

// :snippet-start: to-many-relationship
struct Company : realm::object<Company> {
//    realm::persisted<realm::uuid> _id;
    realm::persisted<std::string> name;
    // To-many relationships are a list, represented here as a
    // vector container whose value type is the Realm object
    // type that the list field links to.
    realm::persisted<std::vector<Employee>> employees;

    static constexpr auto schema = realm::schema("Company",
//        realm::property<&Company::_id, true>("_id"),
        realm::property<&Company::name>("name"),
        realm::property<&Company::employees>("employees"));
};
// :snippet-end:

#if 0
TEST_CASE("create an embedded object", "[model][write]") {
    // :snippet-start: create-embedded-object
    auto realm = realm::open<Business, ContactDetails>();

    auto business = Business { .name = "MongoDB" };
    business.contactDetails = ContactDetails { 
        .emailAddress = "email@example.com", 
        .phoneNumber = "123-456-7890"
    };

    realm.write([&realm, &business] {
        realm.add(business);
    });
    // :snippet-end:
    SECTION("Test code example functions as intended") {
        auto businesses = realm.objects<Business>();
        Business mongoDBPointer = businesses[0];
        REQUIRE(businesses.size() >= 1);
        REQUIRE(mongoDBPointer.contactDetails->emailAddress == "email@example.com");
    }
    // Clean up after test
    realm.write([&realm, &business] {
        realm.remove(business);
    });
}
#endif

TEST_CASE("create object with ignored property", "[model][write]") {
    auto realm = realm::open<Employee>();

    auto employee = Employee { 
        .firstName = "Leslie", 
        .lastName = "Knope", 
        .jobTitle_notPersisted = "Organizer-In-Chief" };

    realm.write([&realm, &employee] {
        realm.add(employee);
    });

    SECTION("Test code example functions as intended") {
        auto employees = realm.objects<Employee>();
        auto employeesNamedLeslie = employees.where([](auto &employee) {
            return employee.firstName == "Leslie";
        });
        CHECK(employeesNamedLeslie.size() >= 1);
        auto leslieKnope = employeesNamedLeslie[0];
        REQUIRE(employee.jobTitle_notPersisted == "Organizer-In-Chief");
        REQUIRE(leslieKnope.jobTitle_notPersisted.empty());
    }
    // Clean up after the test
    realm.write([&realm, &employee] {
        realm.remove(employee);
    });
};

#if 0
TEST_CASE("create object with to-one relationship", "[model][write][relationship]") {
    // :snippet-start: create-object-with-to-one-relationship
    auto realm = realm::open<PointOfInterest, GPSCoordinates>();

    auto gpsCoordinates = GPSCoordinates { .latitude = 36.0554, .longitude = 112.1401 };
    auto pointOfInterest = PointOfInterest { .name = "Grand Canyon Village" };
    pointOfInterest.gpsCoordinates = gpsCoordinates;

    realm.write([&realm, &pointOfInterest] {
        realm.add(pointOfInterest);
    });
    // :snippet-end:

    SECTION("Test code example functions as intended") {
        auto pointsOfInterest = realm.objects<PointOfInterest>();
        auto namedGrandCanyonVillage = pointsOfInterest.where([](auto &pointOfInterest) {
            return pointOfInterest.name == "Grand Canyon Village";
        });
        CHECK(namedGrandCanyonVillage.size() >= 1);
        auto grandCanyonVillage = namedGrandCanyonVillage[0];
        std::cout << "Point of Interest: " << grandCanyonVillage->name << "\n";
        REQUIRE(grandCanyonVillage->name == "Grand Canyon Village");
        auto const &theseGpsCoordinates = *(grandCanyonVillage->gpsCoordinates);
        static_assert(std::is_same_v<decltype(theseGpsCoordinates), std::optional<GPSCoordinates> const &>, "Dereference fail!"); // :remove:
        auto latitude = *(theseGpsCoordinates->latitude);
        static_assert(std::is_same_v<decltype(latitude), double>, "Dereference fail!"); // :remove:
        std::cout << "POI Latitude: " << latitude << "\n";
        REQUIRE(latitude == 36.0554);
    }
    // Clean up after the test
    realm.write([&realm, &pointOfInterest] {
        realm.remove(pointOfInterest);
    });
};
#endif

TEST_CASE("create object with to-many relationship", "[model][write][relationship]") {
    // :snippet-start: create-object-with-to-many-relationship
    auto realm = realm::open<Company, Employee>();

    auto employee1 = Employee {
        .firstName = "Pam",
        .lastName = "Beesly" };
    
    auto employee2 = Employee {
        .firstName = "Jim",
        .lastName = "Halpert" };

    auto company = Company {
        .name = "Dunder Mifflin"
    };
    
    // Use the `push_back` member function available to the 
    // `ListObjectPersistable<T>` template to append `Employee` objects to
    // the `Company` `employees` list property. 
    company.employees.push_back(employee1);
    company.employees.push_back(employee2);

    realm.write([&realm, &company] {
        realm.add(company);
    });
    // :snippet-end:

    // :snippet-start: check-size-and-access-results
    // :snippet-start: read-objects-from-realm
    auto companies = realm.objects<Company>();
    // :snippet-end:
    // :snippet-start: filter-using-type-safe-query
    auto namedDunderMifflin = companies.where([](auto &company) {
        return company.name == "Dunder Mifflin";
    });
    // :snippet-end:
    CHECK(namedDunderMifflin.size() >= 1);
    Company dunderMifflin = namedDunderMifflin[0];
    std::cout << "Company named: " << dunderMifflin.name << "\n";
    // :snippet-end:

    SECTION("Test code example functions as intended") {
        REQUIRE(dunderMifflin.name == "Dunder Mifflin");
        auto employeeCount = dunderMifflin.employees.size();
        REQUIRE(employeeCount >= 2);
        auto companyEmployees = dunderMifflin.employees;
        auto employees = realm.objects<Employee>();
        auto employeesNamedJim = employees.where([](auto &employee) {
            return employee.firstName == "Jim";
        });
        REQUIRE(employeesNamedJim.size() >= 1);
    }
    // Clean up after the test
    realm.write([&realm, &company] {
        realm.remove(company);
    });
};

#if 0
TEST_CASE("update an embedded object", "[model][update]") {
    auto realm = realm::open<Business, ContactDetails>();

    auto business = Business { .name = "MongoDB" };
    business.contactDetails = ContactDetails { 
        .emailAddress = "email@example.com", 
        .phoneNumber = "123-456-7890"
    };

    realm.write([&realm, &business] {
        realm.add(business);
    });
    SECTION("This example could fail but we still want to clean up after the test") {
        // :snippet-start: update-embedded-object
        auto businesses = realm.objects<Business>();
        auto mongoDBPointer = businesses[0];
        REQUIRE(mongoDBPointer.contactDetails->emailAddress == "email@example.com"); // :remove:

        realm.write([&realm, &mongoDBPointer] {
            mongoDBPointer.contactDetails->emailAddress = "info@example.com";
        });

        std::cout << "New email address: " << mongoDBPointer.contactDetails->emailAddress << "\n";
        // :snippet-end:
        REQUIRE(mongoDBPointer.contactDetails->emailAddress == "info@example.com");
    }
    // Clean up after the test
    realm.write([&realm, &business] {
        realm.remove(business);
    });
}
#endif

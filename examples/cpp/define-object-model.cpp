#include <catch2/catch_test_macros.hpp>
#include <string>
#include <cpprealm/sdk.hpp>

// :replace-start: {
//   "terms": {
//     "ToOneRelationship_": ""
//   }
// }

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
    realm::persisted<int64_t> _id;
    realm::persisted<std::string> name;
    realm::persisted<std::optional<ContactDetails>> contactDetails; // :emphasize:

    static constexpr auto schema = realm::schema("Business",
        realm::property<&Business::_id, true>("_id"),
        realm::property<&Business::name>("name"),
        realm::property<&Business::contactDetails>("contactDetails")); // :emphasize:
};
// :snippet-end:

// :snippet-start: model-with-ignored-field
struct Employee : realm::object<Employee> {
    realm::persisted<int64_t> _id;
    realm::persisted<std::string> firstName;
    realm::persisted<std::string> lastName;
    // Omitting the `realm::persisted` annotation means
    // realm ignores this property
    std::string jobTitle_notPersisted;

    // Your schema consists of properties that you want realm to store.
    // Omit properties that you want to ignore from the schema.
    static constexpr auto schema = realm::schema("Employee",
        realm::property<&Employee::_id, true>("_id"),
        realm::property<&Employee::firstName>("firstName"),
        realm::property<&Employee::lastName>("lastName"));
};
// :snippet-end:

// :snippet-start: to-one-relationship
struct ToOneRelationship_FavoriteToy : realm::object<ToOneRelationship_FavoriteToy> {
    realm::persisted<int64_t> _id;
    realm::persisted<std::string> name;

    static constexpr auto schema = realm::schema("ToOneRelationship_FavoriteToy",
        realm::property<&ToOneRelationship_FavoriteToy::_id, true>("_id"),
        realm::property<&ToOneRelationship_FavoriteToy::name>("name"));
};

struct ToOneRelationship_Dog : realm::object<ToOneRelationship_Dog> {
    realm::persisted<int64_t> _id;
    realm::persisted<std::string> name;
    realm::persisted<int64_t> age;
    // To-one relationship objects must be optional
    realm::persisted<std::optional<ToOneRelationship_FavoriteToy>> favoriteToy;

    static constexpr auto schema = realm::schema("ToOneRelationship_Dog",
        realm::property<&ToOneRelationship_Dog::_id, true>("_id"),
        realm::property<&ToOneRelationship_Dog::name>("name"),
        realm::property<&ToOneRelationship_Dog::age>("age"),
        realm::property<&ToOneRelationship_Dog::favoriteToy>("favoriteToy"));
};
// :snippet-end:

#if 0
// Temporarily removing this model as doubles are causing an error                                     
struct GPSCoordinates: realm::object<GPSCoordinates> {
    realm::persisted<double> latitude;
    realm::persisted<double> longitude;

    static constexpr auto schema = realm::schema("GPSCoordinates",
        realm::property<&GPSCoordinates::latitude>("latitude"),
        realm::property<&GPSCoordinates::longitude>("longitude"));
};

struct PointOfInterest : realm::object<PointOfInterest> {
    realm::persisted<int64_t> _id;
    realm::persisted<std::string> name;
    // To-one relationship objects must be optional
    realm::persisted<std::optional<GPSCoordinates>> gpsCoordinates;

    static constexpr auto schema = realm::schema("PointOfInterest",
        realm::property<&PointOfInterest::_id, true>("_id"),
        realm::property<&PointOfInterest::name>("name"),
        realm::property<&PointOfInterest::gpsCoordinates>("gpsCoordinates"));
};
#endif

// :snippet-start: to-many-relationship
struct Company : realm::object<Company> {
    realm::persisted<int64_t> _id;
    realm::persisted<std::string> name;
    // To-many relationships are a list, represented here as a
    // vector container whose value type is the Realm object
    // type that the list field links to.
    realm::persisted<std::vector<Employee>> employees;

    static constexpr auto schema = realm::schema("Company",
        realm::property<&Company::_id, true>("_id"),
        realm::property<&Company::name>("name"),
        realm::property<&Company::employees>("employees"));
};
// :snippet-end:

// struct EmbeddedFoo: realm::embedded_object<EmbeddedFoo> {
//     realm::persisted<int64_t> bar;

//     static constexpr auto schema = realm::schema("EmbeddedFoo", realm::property<&EmbeddedFoo::bar>("bar"));
// };

// struct Foo: realm::object<Foo> {
//     realm::persisted<int64_t> bar;
//     realm::persisted<std::optional<EmbeddedFoo>> foo;

//     realm::persisted<int64_t> bar2;
//     realm::persisted<std::optional<EmbeddedFoo>> foo2;

//     Foo() = default;
//     Foo(const Foo&) = delete;
//     static constexpr auto schema = realm::schema("Foo",
//         realm::property<&Foo::bar>("bar"),
//         realm::property<&Foo::foo>("foo"),
//         realm::property<&Foo::bar2>("bar2"),
//         realm::property<&Foo::foo2>("foo2"));
// };
// TEST_CASE("SDK's version of create an embedded object", "[model][write]") {
//     auto realm = realm::open<Foo, EmbeddedFoo>();

//     auto foo = Foo();
//     foo.foo = EmbeddedFoo{.bar=42};
//     realm.write([&foo, &realm]() {
//         realm.add(foo);
//     });

//     CHECK(foo.foo->bar == 42);
//     EmbeddedFoo e_foo = *(*foo.foo);

//     realm.write([&foo, &realm]() {
//         realm.remove(foo);
//     });
// }

TEST_CASE("create an embedded object", "[model][write]") {
    // :snippet-start: create-embedded-object
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
    // :snippet-end:
    SECTION("Test code example functions as intended") {
        auto businesses = realm.objects<Business>();
        Business mongoDBPointer = businesses[0];
        REQUIRE(businesses.size() >= 1);
        REQUIRE(business.contactDetails->emailAddress == "email@example.com");
        std::cout << "Business email address is: " << business.contactDetails->emailAddress << "\n";
    }
    // Clean up after test
    realm.write([&realm, &business] {
        realm.remove(business);
    });
}

TEST_CASE("create object with ignored property", "[model][write]") {
    auto realm = realm::open<Employee>();

    auto employee = Employee { 
        ._id = 12345,
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

TEST_CASE("create object with to-one relationship", "[model][write][relationship]") {
    // :snippet-start: create-object-with-to-one-relationship
    auto realm = realm::open<ToOneRelationship_Dog, ToOneRelationship_FavoriteToy>();

    auto favoriteToy = ToOneRelationship_FavoriteToy { .name = "Wubba" };
    auto dog = ToOneRelationship_Dog { .name = "Lita", .age = 10 };
    dog.favoriteToy = favoriteToy;

    realm.write([&realm, &dog] {
        realm.add(dog);
    });
    // :snippet-end:

    SECTION("Test code example functions as intended") {
        auto dogs = realm.objects<ToOneRelationship_Dog>();
        auto namedLita = dogs.where([](auto &dog) {
            return dog.name == "Lita";
        });
        CHECK(namedLita.size() >= 1);
        auto lita = namedLita[0];
        std::cout << "Dog's name is " << lita.name << "\n";
        REQUIRE(lita.name == "Lita");
        auto litaFavoriteToy = dog.favoriteToy;
        auto favoriteToyName = litaFavoriteToy->name;
        std::cout << "Lita's favorite toy: " << favoriteToyName << "\n";
        REQUIRE(favoriteToyName == "Wubba");
    }
    // Clean up after the test
    realm.write([&realm, &dog] {
        realm.remove(dog);
    });
};

#if 0
// Temporarily removing this since the related model has been removed
TEST_CASE("create object with to-one relationship", "[model][write][relationship]") {
    auto realm = realm::open<PointOfInterest, GPSCoordinates>();

    auto gpsCoordinates = GPSCoordinates { .latitude = 36.0554, .longitude = 112.1401 };
    auto pointOfInterest = PointOfInterest { .name = "Grand Canyon Village" };
    pointOfInterest.gpsCoordinates = gpsCoordinates;

    realm.write([&realm, &pointOfInterest] {
        realm.add(pointOfInterest);
    });

    SECTION("Test code example functions as intended") {
        auto pointsOfInterest = realm.objects<PointOfInterest>();
        auto namedGrandCanyonVillage = pointsOfInterest.where([](auto &pointOfInterest) {
            return pointOfInterest.name == "Grand Canyon Village";
        });
        CHECK(namedGrandCanyonVillage.size() >= 1);
        auto grandCanyonVillage = namedGrandCanyonVillage[0];
        std::cout << "Point of Interest: " << grandCanyonVillage.name << "\n";
        REQUIRE(grandCanyonVillage.name == "Grand Canyon Village");
        auto const &theseGpsCoordinates = *(grandCanyonVillage.gpsCoordinates);
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
        ._id = 23456,
        .firstName = "Pam",
        .lastName = "Beesly" };
    
    auto employee2 = Employee {
        ._id = 34567,
        .firstName = "Jim",
        .lastName = "Halpert" };

    auto company = Company {
        ._id = 45678,
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

        realm.write([&realm, &mongoDBPointer] {
            mongoDBPointer.contactDetails->emailAddress = "info@example.com";
        });

        std::cout << "New email address: " << mongoDBPointer.contactDetails->emailAddress << "\n";
        // :snippet-end:
    }
    // Clean up after the test
    realm.write([&realm, &business] {
        realm.remove(business);
    });
}

// :replace-end:
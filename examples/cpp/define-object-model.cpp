#include <catch2/catch_test_macros.hpp>
#include <string>
#include <iostream>
#include <cpprealm/sdk.hpp>

// :replace-start: {
//   "terms": {
//     "ToOneRelationship_": "",
//     "Map_": ""
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
    realm::persisted<realm::object_id> _id{realm::object_id::generate()};
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

// :snippet-start: model-with-map-property
struct Map_Employee : realm::object<Map_Employee> {
    enum class WorkLocation {
        HOME, OFFICE
    };

    realm::persisted<int64_t> _id;
    realm::persisted<std::string> firstName;
    realm::persisted<std::string> lastName;
    realm::persisted<std::map<std::string, WorkLocation>> locationByDay;

    static constexpr auto schema = realm::schema("Map_Employee",
        realm::property<&Map_Employee::_id, true>("_id"),
        realm::property<&Map_Employee::firstName>("firstName"),
        realm::property<&Map_Employee::lastName>("lastName"),
        realm::property<&Map_Employee::locationByDay>("locationByDay"));
};
// :snippet-end:

// :snippet-start: to-one-relationship
struct ToOneRelationship_FavoriteToy : realm::object<ToOneRelationship_FavoriteToy> {
    realm::persisted<realm::uuid> _id;
    realm::persisted<std::string> name;

    static constexpr auto schema = realm::schema("ToOneRelationship_FavoriteToy",
        realm::property<&ToOneRelationship_FavoriteToy::_id, true>("_id"),
        realm::property<&ToOneRelationship_FavoriteToy::name>("name"));
};

struct ToOneRelationship_Dog : realm::object<ToOneRelationship_Dog> {
    realm::persisted<realm::uuid> _id;
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

TEST_CASE("create an embedded object", "[model][write]") {
    // :snippet-start: create-embedded-object
    auto realm = realm::open<Business, ContactDetails>();

    auto business = Business();
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

    auto favoriteToy = ToOneRelationship_FavoriteToy { 
        ._id = realm::uuid("68b696c9-320b-4402-a412-d9cee10fc6a5"), 
        .name = "Wubba" };

    auto dog = ToOneRelationship_Dog { 
        ._id = realm::uuid("68b696d7-320b-4402-a412-d9cee10fc6a3"), 
        .name = "Lita", 
        .age = 10 };
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

    auto business = Business { 
        .name = "MongoDB" 
    };
    
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
        CHECK(mongoDBPointer.contactDetails->emailAddress == "info@example.com");
    }
    // Clean up after the test
    realm.write([&realm, &business] {
        realm.remove(business);
    });
}

TEST_CASE("overwrite an embedded object", "[model][update]") {
    auto realm = realm::open<Business, ContactDetails>();

    auto business = Business { 
        .name = "MongoDB" 
    };
    
    business.contactDetails = ContactDetails { 
        .emailAddress = "email@example.com", 
        .phoneNumber = "123-456-7890"
    };

    realm.write([&realm, &business] {
        realm.add(business);
    });
    SECTION("This example could fail but we still want to clean up after the test") {
        // :snippet-start: overwrite-embedded-object
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
        // :snippet-end:
        CHECK(mongoDBPointer.contactDetails->emailAddress == "info@example.com");
        CHECK(mongoDBPointer.contactDetails->phoneNumber == "234-567-8901");
    }
    // Clean up after the test
    realm.write([&realm, &business] {
        realm.remove(business);
    });
}

TEST_CASE("test enum map object", "[model][write]") {
    // :snippet-start: create-map-object
    auto realm = realm::open<Map_Employee>();

    auto employee = Map_Employee {
        ._id = 8675309,
        .firstName = "Tommy",
        .lastName = "Tutone"
    };

    employee.locationByDay = {
        { "Monday", Map_Employee::WorkLocation::HOME },
        { "Tuesday", Map_Employee::WorkLocation::OFFICE },
        { "Wednesday", Map_Employee::WorkLocation::HOME },
        { "Thursday", Map_Employee::WorkLocation::OFFICE }
    };

    realm.write([&realm, &employee] {
        realm.add(employee);
        employee.locationByDay["Friday"] = Map_Employee::WorkLocation::HOME;
    });
    // :snippet-end:
    CHECK(employee.locationByDay["Friday"] == Map_Employee::WorkLocation::HOME);
    SECTION("Test code example functions as intended") {
        // :snippet-start: read-map-value
        auto employees = realm.objects<Map_Employee>();
        auto employeesNamedTommy = employees.where([](auto &employee) {
            return employee.firstName == "Tommy";
        });
        REQUIRE(employeesNamedTommy.size() >= 1); // :remove:
        auto tommy = employeesNamedTommy[0];
        // You can iterate through keys and values and do something with them
        for (auto [k, v] : tommy.locationByDay) {
            if (k == "Monday") CHECK(v == Map_Employee::WorkLocation::HOME);
            else if (k == "Tuesday") CHECK(v == Map_Employee::WorkLocation::OFFICE);
        }
        // You can get an iterator for an element matching a key using `find()`
        auto tuesdayIterator = tommy.locationByDay.find("Tuesday");
        CHECK(tuesdayIterator != tommy.locationByDay.end()); // :remove:
        
        // You can access values for keys like any other map type
        auto mondayLocation = tommy.locationByDay["Monday"];
        // :snippet-end:
        CHECK(tommy.locationByDay["Tuesday"] == Map_Employee::WorkLocation::OFFICE); // :remove:
        // :snippet-start: update-map-value
        // You can check that a key exists using `find`
        auto findTuesday = tommy.locationByDay.find("Tuesday");
        if (findTuesday != tommy.locationByDay.end())
            realm.write([&realm, &tommy] {
                tommy.locationByDay["Tuesday"] = Map_Employee::WorkLocation::HOME;
            });
        ;
        // :snippet-end:
        CHECK(tommy.locationByDay["Tuesday"] == Map_Employee::WorkLocation::HOME);
        // :snippet-start: delete-map-value
        realm.write([&realm, &tommy] {
            tommy.locationByDay.erase("Tuesday");
        });
        // :snippet-end:
        CHECK(tommy.locationByDay.find("Tuesday") == tommy.locationByDay.end());
    }
    // Clean up after test
    realm.write([&realm, &employee] {
        realm.remove(employee);
    });
}

// :snippet-start: dog-map-model
struct Map_Dog : realm::object<Map_Dog> {
    realm::persisted<std::string> name;
    realm::persisted<std::map<std::string, std::string>> favoriteParkByCity;

    static constexpr auto schema = realm::schema("Map_Dog",
        realm::property<&Map_Dog::name>("name"),
        realm::property<&Map_Dog::favoriteParkByCity>("favoriteParkByCity"));
};
// :snippet-end:

// Note: the below test case was for a "simpler" version of a map
// while trying to debug delete functionality. It's not actually used
// in any of the code examples, although the model above is used on the Supported Types page
TEST_CASE("test string map object", "[model][write]") {
    auto realm = realm::open<Map_Dog>();

    auto dog = Map_Dog {
        .name = "Maui"
    };

    dog.favoriteParkByCity = {
        { "Boston", "Fort Point" },
        { "New York", "Central Park" }
    };

    realm.write([&realm, &dog] {
        realm.add(dog);
    });

    SECTION("Test code example functions as intended") {

        auto dogs = realm.objects<Map_Dog>();
        auto dogsNamedMaui = dogs.where([](auto &dog) {
            return dog.name == "Maui";
        });
        REQUIRE(dogsNamedMaui.size() >= 1);
        auto maui = dogsNamedMaui[0];
        for (auto [k, v] : maui.favoriteParkByCity) {
            if (k == "Boston") CHECK(v == "Fort Point");
            else if (k == "New York") CHECK(v == "Central Park");
        }
        // Use `find()` for read-only access as `operator[]` could create an entry
        auto favoriteBostonPark = maui.favoriteParkByCity.find("Boston");
        CHECK(favoriteBostonPark != maui.favoriteParkByCity.end());
        auto favoriteNewYorkPark = maui.favoriteParkByCity["New York"];
        CHECK(favoriteNewYorkPark == "Central Park");
        realm.write([&realm, &maui] {
            maui.favoriteParkByCity["New York"] = "Some other park";
        });
        CHECK(favoriteNewYorkPark == "Some other park");
        realm.write([&realm, &maui] {
             maui.favoriteParkByCity.erase("New York");
        });
        CHECK(maui.favoriteParkByCity.find("New York") == maui.favoriteParkByCity.end());
    }
    // Clean up after test
    realm.write([&realm, &dog] {
        realm.remove(dog);
    });
}

// :replace-end:

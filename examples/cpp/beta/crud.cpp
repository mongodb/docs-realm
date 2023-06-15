#include <catch2/catch_test_macros.hpp>
#include <cpprealm/sdk.hpp>
// :snippet-start: import-experimental-header
#include <cpprealm/experimental/sdk.hpp>
// :snippet-end:

// :replace-start: {
//   "terms": {
//     "Beta_": "",
//     "Beta_Map_": ""
//   }
// }

// :snippet-start: experimental-namespace
using namespace realm::experimental;
// :snippet-end:

// :snippet-start: beta-realm-define-model
// :snippet-start: beta-single-object-model
struct Beta_Dog {
    std::string name;
    int64_t age;
};
REALM_SCHEMA(Beta_Dog, name, age)
// :snippet-end:

// :snippet-start: beta-person-model
struct Beta_Person {
    primary_key<int64_t> _id;
    std::string name;
    int64_t age;
    
    realm::experimental::link<Beta_Dog> dog;
};
REALM_SCHEMA(Beta_Person, _id, name, age, dog)
// :snippet-end:
// :snippet-end:

// :snippet-start: beta-employee-model
struct Beta_Employee {
    primary_key<int64_t> _id;
    std::string firstName;
    std::string lastName;
    
    // You can use this property as you would any other member
    // Omitting it from the schema means Realm ignores it
    std::string jobTitle_notPersisted;
    
    realm::experimental::link<Beta_Dog> dog;
};
// The REALM_SCHEMA omits the `jobTitle_notPersisted` property
// Realm does not store and cannot retrieve a value for this property
REALM_SCHEMA(Beta_Employee, _id, firstName, lastName)
// :snippet-end:

// :snippet-start: beta-model-with-embedded-object
struct Beta_ContactDetails {
    // Because ContactDetails is an embedded object, it cannot have its own _id
    // It does not have a lifecycle outside of the top-level object
    std::string emailAddress;
    std::string phoneNumber;
};
REALM_EMBEDDED_SCHEMA(Beta_ContactDetails, emailAddress, phoneNumber)

struct Beta_Business {
    realm::object_id _id;
    std::string name;
    realm::experimental::link<Beta_ContactDetails> contactDetails;
};
REALM_SCHEMA(Beta_Business, _id, name, contactDetails)
// :snippet-end:

// :snippet-start: beta-model-with-map-property
struct Beta_Map_Employee {
    enum class WorkLocation {
        HOME, OFFICE
    };

    int64_t _id;
    std::string firstName;
    std::string lastName;
    std::map<std::string, WorkLocation> locationByDay;
};
REALM_SCHEMA(Beta_Map_Employee, _id, firstName, lastName, locationByDay)
// :snippet-end:

TEST_CASE("Beta define model example", "[write]") {
    auto relative_realm_path_directory = "beta_dog/";
    std::filesystem::create_directories(relative_realm_path_directory);
    std::filesystem::path path = std::filesystem::current_path().append(relative_realm_path_directory);
    path = path.append("dog_objects");
    path = path.replace_extension("realm");
    // :snippet-start: beta-open-realm
    auto config = realm::db_config();
    config.set_path(path); // :remove:
    auto realm = db(std::move(config));
    // :snippet-end:
    
    auto dog = Beta_Dog {
        .name = "Maui",
        .age = 2
    };
    
    auto person = Beta_Person {
        ._id = 123,
        .name = "Dachary",
        .age = 42,
        .dog = dog
    };
    
    // :snippet-start: beta-write-to-realm
    realm.write([&] {
        realm.add(std::move(person));
    });
    // :snippet-end:
    
    auto managedPeople = realm.objects<Beta_Person>();
    auto specificPerson = managedPeople[0];
    REQUIRE(specificPerson._id == static_cast<long long>(123));
    REQUIRE(specificPerson.name == "Dachary");
    REQUIRE(specificPerson.age == static_cast<long long>(42));
    REQUIRE(specificPerson.dog->name == "Maui");
    REQUIRE(specificPerson.dog->age == static_cast<long long>(2));
    REQUIRE(managedPeople.size() == 1);

    // :snippet-start: beta-remove-from-realm
    realm.write([&] {
        realm.remove(specificPerson);
    });
    // :snippet-end:
    auto managedPeopleAfterDelete = realm.objects<Beta_Person>();
    REQUIRE(managedPeopleAfterDelete.size() == 0);
}

TEST_CASE("Beta ignored property example", "[write]") {
    // :snippet-start: beta-open-realm-at-path
    auto relative_realm_path_directory = "custom_path_directory/";
    std::filesystem::create_directories(relative_realm_path_directory); // :remove:
    // Construct a path
    std::filesystem::path path = std::filesystem::current_path().append(relative_realm_path_directory);
    // Add a name for the realm file
    path = path.append("employee_objects");
    // Add the .realm extension
    path = path.replace_extension("realm");
    // Set the path on the config, and open a realm at the path
    auto config = realm::db_config();
    config.set_path(path);
    auto realmInstance = db(std::move(config));
    // :snippet-end:
    
    auto employee = Beta_Employee {
        ._id = 12345,
        .firstName = "Leslie",
        .lastName = "Knope",
        .jobTitle_notPersisted = "Deputy Director"
    };
    
    realmInstance.write([&] {
        realmInstance.add(std::move(employee));
    });
    
    auto managedEmployees = realmInstance.objects<Beta_Employee>();
    auto specificEmployee = managedEmployees[0];
    REQUIRE(specificEmployee._id == static_cast<long long>(12345));
    REQUIRE(specificEmployee.firstName == "Leslie");
    REQUIRE(specificEmployee.lastName == "Knope");
    REQUIRE(managedEmployees.size() == 1);

    realmInstance.write([&] {
        realmInstance.remove(specificEmployee);
    });
    auto managedEmployeesAfterDelete = realmInstance.objects<Beta_Employee>();
    REQUIRE(managedEmployeesAfterDelete.size() == 0);
}

TEST_CASE("Beta embedded object example", "[write]") {
    auto relative_realm_path_directory = "beta_business/";
    std::filesystem::create_directories(relative_realm_path_directory);
    std::filesystem::path path = std::filesystem::current_path().append(relative_realm_path_directory);
    path = path.append("business_objects");
    path = path.replace_extension("realm");
    
    // :snippet-start: beta-create-embedded-object
    auto config = realm::db_config();
    config.set_path(path); // :remove:
    auto realm = db(std::move(config));
    
    // :remove-start:
    // Generating an objectId here and will set it after
    // the "public" example below for covenient testing later
    auto objectId = realm::object_id::generate();
    // :remove-end:
    auto business = Beta_Business();
    business._id = realm::object_id::generate();
    business._id = objectId; // :remove:
    business.name = "MongoDB";
    business.contactDetails = Beta_ContactDetails {
        .emailAddress = "email@example.com",
        .phoneNumber = "123-456-7890"
    };
    
    realm.write([&] {
        realm.add(std::move(business));
    });
    // :snippet-end:
    
    auto managedBusinesses = realm.objects<Beta_Business>();
    auto specificBusiness = managedBusinesses[0];
    REQUIRE(specificBusiness._id == objectId);
    REQUIRE(specificBusiness.name == "MongoDB");
    REQUIRE(specificBusiness.contactDetails->emailAddress == "email@example.com");
    REQUIRE(specificBusiness.contactDetails->phoneNumber == "123-456-7890");
    REQUIRE(managedBusinesses.size() == 1);

    realm.write([&] {
        realm.remove(specificBusiness);
    });
    auto managedBusinessesAfterDelete = realm.objects<Beta_Business>();
    REQUIRE(managedBusinessesAfterDelete.size() == 0);
}

TEST_CASE("create a dog", "[write]") {
    // :snippet-start: beta-create-an-object
    // Create a Realm object like a regular object.
    auto dog = Beta_Dog { .name = "Rex", .age = 1 };

    std::cout << "dog: " << dog.name << "\n";

    // Open a realm with compile-time schema checking.
    auto config = realm::db_config();
    auto realm = db(std::move(config));

    // Persist your data in a write transaction
    realm.write([&] {
        realm.add(std::move(dog));
    });
    // :snippet-end:
    auto dogs = realm.objects<Beta_Dog>();
    auto dogsCount = dogs.size();
    REQUIRE(dogsCount >= 1);
    auto specificDog = dogs[0];
    // :snippet-start: beta-delete-an-object
    realm.write([&] {
        realm.remove(specificDog);
    });
    // :snippet-end:
    auto updatedDogsCount = realm.objects<Beta_Dog>().size();
    REQUIRE(updatedDogsCount < dogsCount);
}

TEST_CASE("test map object", "[write]") {
    auto relative_realm_path_directory = "crud/";
    std::filesystem::create_directories(relative_realm_path_directory);
    std::filesystem::path path = std::filesystem::current_path().append(relative_realm_path_directory);
    path = path.append("beta_employee_map_objects");
    path = path.replace_extension("realm");
    // :snippet-start: beta-create-map-object
    auto config = realm::db_config();
    config.set_path(path); // :remove:
    auto realm = db(std::move(config));

    auto employee = Beta_Map_Employee {
        ._id = 8675309,
        .firstName = "Tommy",
        .lastName = "Tutone"
    };

    employee.locationByDay = {
        { "Monday", Beta_Map_Employee::WorkLocation::HOME },
        { "Tuesday", Beta_Map_Employee::WorkLocation::OFFICE },
        { "Wednesday", Beta_Map_Employee::WorkLocation::HOME },
        { "Thursday", Beta_Map_Employee::WorkLocation::OFFICE }
    };

    realm.write([&] {
        realm.add(std::move(employee));
        employee.locationByDay["Friday"] = Beta_Map_Employee::WorkLocation::HOME;
    });
    // :snippet-end:
    
    CHECK(employee.locationByDay["Friday"] == Beta_Map_Employee::WorkLocation::HOME);
    SECTION("Test code example functions as intended") {
        // :snippet-start: beta-read-map-value
        auto employees = realm.objects<Beta_Map_Employee>();
        auto employeesNamedTommy = employees.where([](auto &employee) {
            return employee.firstName == "Tommy";
        });
        REQUIRE(employeesNamedTommy.size() >= 1); // :remove:
        auto tommy = employeesNamedTommy[0];
        // You can iterate through keys and values and do something with them
//            for (auto [k, v] : tommy.locationByDay) {
//                if (k == "Monday") CHECK(v == Beta_Map_Employee::WorkLocation::HOME);
//                else if (k == "Tuesday") CHECK(v == Beta_Map_Employee::WorkLocation::OFFICE);
//            }
        // You can get an iterator for an element matching a key using `find()`
        auto tuesdayIterator = tommy.locationByDay.find("Tuesday");
        CHECK(tuesdayIterator != tommy.locationByDay.end()); // :remove:
        
        // You can access values for keys like any other map type
        auto mondayLocation = tommy.locationByDay["Monday"];
        // :snippet-end:
        CHECK(tommy.locationByDay["Tuesday"] == Beta_Map_Employee::WorkLocation::OFFICE); // :remove:
        // :snippet-start: beta-update-map-value
        // You can check that a key exists using `find`
        auto findTuesday = tommy.locationByDay.find("Tuesday");
        if (findTuesday != tommy.locationByDay.end())
            realm.write([&] {
                tommy.locationByDay["Tuesday"] = Beta_Map_Employee::WorkLocation::HOME;
            });
        ;
        // :snippet-end:
        CHECK(tommy.locationByDay["Tuesday"] == Beta_Map_Employee::WorkLocation::HOME);
        // :snippet-start: beta-delete-map-value
        realm.write([&] {
            tommy.locationByDay.erase("Tuesday");
        });
        // :snippet-end:
        CHECK(tommy.locationByDay.find("Tuesday") == tommy.locationByDay.end());
        // Clean up after test
        realm.write([&] {
            realm.remove(tommy);
        });
    }
}
// :replace-end:

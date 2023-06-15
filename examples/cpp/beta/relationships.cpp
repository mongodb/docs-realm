#include <catch2/catch_test_macros.hpp>
#include <cpprealm/sdk.hpp>
#include <cpprealm/experimental/sdk.hpp>

// :replace-start: {
//   "terms": {
//     "Beta_Relationship_": ""
//   }
// }

namespace realm::experimental {

    // :snippet-start: beta-to-one-relationship
    struct Beta_Relationship_FavoriteToy {
        primary_key<realm::uuid> _id;
        std::string name;
    };
    REALM_SCHEMA(Beta_Relationship_FavoriteToy, _id, name)

    struct Beta_Relationship_Dog {
        primary_key<realm::uuid> _id;
        std::string name;
        int64_t age;
        
        // Define a relationship as a link to another Realm object
        link<Beta_Relationship_FavoriteToy> favoriteToy;
    };
    REALM_SCHEMA(Beta_Relationship_Dog, _id, name, age, favoriteToy)
    // :snippet-end:

    struct Beta_Relationship_Employee {
        int64_t _id;
        std::string firstName;
        std::string lastName;
    };
    REALM_SCHEMA(Beta_Relationship_Employee, _id, firstName, lastName)

    // :snippet-start: beta-to-many-relationship
    struct Beta_Relationship_Company {
        int64_t _id;
        std::string name;
        // To-many relationships are a list, represented here as a
        // vector container whose value type is the Realm object
        // type that the list field links to.
        std::vector<link<Beta_Relationship_Employee>> employees;
    };
    REALM_SCHEMA(Beta_Relationship_Company, _id, name, employees)
    // :snippet-end:

    TEST_CASE("Beta define to-one relationship example", "[write]") {
        auto relative_realm_path_directory = "beta_relationship/";
        std::filesystem::create_directories(relative_realm_path_directory);
        std::filesystem::path path = std::filesystem::current_path().append(relative_realm_path_directory);
        path = path.append("dog_objects");
        path = path.replace_extension("realm");
        auto config = db_config();
        config.set_path(path);
        auto realmInstance = db(std::move(config));
        
        auto favoriteToy = Beta_Relationship_FavoriteToy {
            ._id = realm::uuid("68b696c9-320b-4402-a412-d9cee10fc6a5"),
            .name = "Wubba"
        };
        
        auto dog = Beta_Relationship_Dog {
            ._id = realm::uuid("68b696d7-320b-4402-a412-d9cee10fc6a3"),
            .name = "Lita",
            .age = 10,
            .favoriteToy = favoriteToy
        };
        
        realmInstance.write([&] {
            realmInstance.add(std::move(dog));
        });
        
        auto managedDogs = realmInstance.objects<Beta_Relationship_Dog>();
        auto specificDog = managedDogs[0];
        REQUIRE(specificDog._id == realm::uuid("68b696d7-320b-4402-a412-d9cee10fc6a3"));
        REQUIRE(specificDog.name == "Lita");
        REQUIRE(specificDog.age == static_cast<long long>(10));
        REQUIRE(specificDog.favoriteToy->name == "Wubba");
        REQUIRE(managedDogs.size() == 1);

        realmInstance.write([&] {
            realmInstance.remove(specificDog);
        });

        auto managedDogsAfterDelete = realmInstance.objects<Beta_Relationship_Dog>();
        REQUIRE(managedDogsAfterDelete.size() == 0);
    }
    TEST_CASE("Beta define to-many relationship example", "[write]") {
        auto relative_realm_path_directory = "beta_relationship/";
        std::filesystem::create_directories(relative_realm_path_directory);
        std::filesystem::path path = std::filesystem::current_path().append(relative_realm_path_directory);
        path = path.append("dog_objects");
        path = path.replace_extension("realm");
        auto config = db_config();
        config.set_path(path);
        auto realmInstance = db(std::move(config));
        
        auto employee1 = Beta_Relationship_Employee {
            ._id = 23456,
            .firstName = "Pam",
            .lastName = "Beesly"
        };
        
        auto employee2 = Beta_Relationship_Employee {
            ._id = 34567,
            .firstName = "Jim",
            .lastName = "Halpert"
        };
        
        auto company = Beta_Relationship_Company {
            ._id = 45678,
            .name = "Dunder Mifflin"
        };
        
        company.employees.push_back(employee1);
        company.employees.push_back(employee2);
        
        realmInstance.write([&] {
            realmInstance.add(std::move(company));
        });
        
        auto companies = realmInstance.objects<Beta_Relationship_Company>();
        auto namedDunderMifflin = companies.where([](auto &company) {
            return company.name == "Dunder Mifflin";
        });
        CHECK(namedDunderMifflin.size() >= 1);
        auto dunderMifflin = namedDunderMifflin[0];
        
        SECTION("Verify expected properties of retrieved object") {
            REQUIRE(dunderMifflin.name == "Dunder Mifflin");
            auto employeeCount = dunderMifflin.employees.size();
            REQUIRE(employeeCount >= 2);
            auto companyEmployees = dunderMifflin.employees;
            auto employees = realmInstance.objects<Beta_Relationship_Employee>();
            auto employeesNamedJim = employees.where([](auto &employee) {
                return employee.firstName == "Jim";
            });
            REQUIRE(employeesNamedJim.size() >= 1);
        }

        realmInstance.write([&] {
            realmInstance.remove(dunderMifflin);
        });

        auto managedCompaniesAfterDelete = realmInstance.objects<Beta_Relationship_Company>();
        REQUIRE(managedCompaniesAfterDelete.size() == 0);
    }
}

// :replace-end:

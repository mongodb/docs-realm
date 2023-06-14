#include <catch2/catch_test_macros.hpp>
#include <cpprealm/sdk.hpp>
// :snippet-start: import-experimental-header
#include <cpprealm/experimental/sdk.hpp>
// :snippet-end:

// :replace-start: {
//   "terms": {
//     "Beta_": ""
//   }
// }

// :snippet-start: experimental-namespace
namespace realm::experimental {
// :snippet-end:

    // :snippet-start: beta-realm-define-model
    struct Beta_Dog {
        std::string name;
        int64_t age;
    };
    REALM_SCHEMA(Beta_Dog, name, age)
    
    // :snippet-start: beta-person-model
    struct Beta_Person {
        primary_key<int64_t> _id;
        std::string name;
        int64_t age;
        
        link<Beta_Dog> dog;
    };
    REALM_SCHEMA(Beta_Person, _id, name, age, dog)
    // :snippet-end:
    // :snippet-end:

    TEST_CASE("Beta define model example", "[write]") {
        auto relative_realm_path_directory = "beta_dog/";
        std::filesystem::create_directories(relative_realm_path_directory);
        std::filesystem::path path = std::filesystem::current_path().append(relative_realm_path_directory);
        path = path.append("dog_objects");
        path = path.replace_extension("realm");
        // :snippet-start: beta-open-realm
        auto config = db_config();
        config.set_path(path); // :remove:
        auto realmInstance = db(std::move(config));
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
        realmInstance.write([&] {
            realmInstance.add(std::move(person));
        });
        // :snippet-end:
        
        auto managedPeople = realmInstance.objects<Beta_Person>();
        auto specificPerson = managedPeople[0];
        REQUIRE(specificPerson._id == static_cast<long long>(123));
        REQUIRE(specificPerson.name == "Dachary");
        REQUIRE(specificPerson.age == static_cast<long long>(42));
        REQUIRE(specificPerson.dog->name == "Maui");
        REQUIRE(specificPerson.dog->age == static_cast<long long>(2));
        REQUIRE(managedPeople.size() == 1);

        // :snippet-start: beta-remove-from-realm
        realmInstance.write([&] {
            realmInstance.remove(specificPerson);
        });
        // :snippet-end:
        auto managedPeopleAfterDelete = realmInstance.objects<Beta_Person>();
        REQUIRE(managedPeopleAfterDelete.size() == 0);
    }

}
// :replace-end:

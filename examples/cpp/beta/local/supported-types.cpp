#include <catch2/catch_test_macros.hpp>
#include <cpprealm/sdk.hpp>
#include <cpprealm/experimental/sdk.hpp>
#include <chrono>
#include <string>
#include <vector>

// :replace-start: {
//   "terms": {
//     "Beta_": "",
//     "Beta_Map_": ""
//   }
// }

using namespace realm::experimental;

struct Beta_AllTypesObject {
    using SomeType = std::string;

    enum class Enum {
        one, two
    };

    // :snippet-start: beta-required-bool
    bool boolName;
    // :snippet-end:
    // :snippet-start: beta-optional-bool
    std::optional<bool> optBoolName;
    // :snippet-end:
    // :snippet-start: beta-required-int
    int64_t intName;
    // :snippet-end:
    // :snippet-start: beta-optional-int
    std::optional<int64_t> optIntName;
    // :snippet-end:
    // :snippet-start: beta-required-double
    double doubleName;
    // :snippet-end:
    // :snippet-start: beta-optional-double
    std::optional<double> optDoubleName;
    // :snippet-end:
    // :snippet-start: beta-required-string
    std::string stringName;
    // :snippet-end:
    // :snippet-start: beta-optional-string
    std::optional<std::string> optStringName;
    // :snippet-end:
    // :snippet-start: beta-required-enum
    Enum enumName;
    // :snippet-end:
    // :snippet-start: beta-optional-enum
    std::optional<Enum> optEnumName;
    // :snippet-end:
    // :snippet-start: beta-required-binary-data
    std::vector<std::uint8_t> binaryDataName;
    // :snippet-end:
    // :snippet-start: beta-optional-binary-data
    std::optional<std::vector<std::uint8_t>> optBinaryDataName;
    // :snippet-end:
    // :snippet-start: beta-required-date
    std::chrono::time_point<std::chrono::system_clock> dateName;
    // :snippet-end:
    // :snippet-start: beta-optional-date
    std::optional<std::chrono::time_point<std::chrono::system_clock>> optDateName;
    // :snippet-end:
    // :snippet-start: beta-required-decimal128
    realm::decimal128 decimal128Name;
    // :snippet-end:
    // :snippet-start: beta-optional-decimal128
    std::optional<realm::decimal128> optDecimal128Name;
    // :snippet-end:
    // :snippet-start: beta-required-uuid
    realm::uuid uuidName;
    // :snippet-end:
    // :snippet-start: beta-optional-uuid
    std::optional<realm::uuid> optUuidName;
    // :snippet-end:
    // :snippet-start: beta-required-object-id
    realm::object_id objectIdName;
    // :snippet-end:
    // :snippet-start: beta-optional-object-id
    std::optional<realm::object_id> optObjectIdName;
    // :snippet-end:
    // :snippet-start: beta-required-mixed-type
    realm::mixed mixedName;
    // :snippet-end:
    // :snippet-start: beta-required-map-type
    std::map<std::string, SomeType> mapName;
    // :snippet-end:
    // :snippet-start: beta-required-list
    std::vector<SomeType> listTypeName;
    // :snippet-end:
    // :snippet-start: beta-required-set
    std::set<SomeType> setTypeName;
    // :snippet-end:
};
REALM_SCHEMA(Beta_AllTypesObject, boolName, optBoolName, intName, optIntName,
    doubleName, optDoubleName, stringName, optStringName, enumName,
    optEnumName, binaryDataName, optBinaryDataName, dateName, optDateName,
    decimal128Name, optDecimal128Name, uuidName, optUuidName, objectIdName, 
    optObjectIdName, mixedName, mapName, listTypeName, setTypeName
)

// :snippet-start: beta-dog-map-model
struct Beta_Map_Dog {
    std::string name;
    std::map<std::string, std::string> favoriteParkByCity;
};
REALM_SCHEMA(Beta_Map_Dog, name, favoriteParkByCity)
// :snippet-end:

TEST_CASE("Test supported types", "[model][write]") {
    auto relative_realm_path_directory = "supported_types/";
    std::filesystem::create_directories(relative_realm_path_directory);
    std::filesystem::path path = std::filesystem::current_path().append(relative_realm_path_directory);
    path = path.append("all_types_objects");
    path = path.replace_extension("realm");
    auto config = realm::db_config();
    config.set_path(path);

    SECTION("Required supported types") {
        auto realm = db(std::move(config));
        auto date = std::chrono::time_point<std::chrono::system_clock>();
        auto uuid = realm::uuid();
        auto objectId = realm::object_id::generate();
        auto decimal = realm::decimal128(123.456);

        auto allRequiredTypesObject = Beta_AllTypesObject {
            .boolName = true,
            .intName = 1,
            .doubleName = 1.1,
            .stringName = "Fluffy",
            .enumName = Beta_AllTypesObject::Enum::one,
            .binaryDataName = std::vector<uint8_t>{0,1,2},
            .dateName = date,
            .decimal128Name = decimal,
            .uuidName = uuid,
            .objectIdName = objectId,
            .mixedName = realm::mixed("mixed data"),
            .mapName = std::map<std::string, std::string>({{"foo", "bar"}}),
            .listTypeName = std::vector<std::string>({"bar", "baz"}),
            .setTypeName = { "Lita", "Maui", "Ash" }
        };

        realm.write([&] {
            realm.add(std::move(allRequiredTypesObject));
        });

        auto allTypeObjects = realm.objects<Beta_AllTypesObject>();
        REQUIRE(allTypeObjects.size() == 1);
        auto specificAllTypeObjects = allTypeObjects[0];
        REQUIRE(specificAllTypeObjects.boolName == true);
        REQUIRE(specificAllTypeObjects.intName == 1);
        REQUIRE(specificAllTypeObjects.doubleName == 1.1);
        REQUIRE(specificAllTypeObjects.stringName == "Fluffy");
        REQUIRE(*specificAllTypeObjects.enumName == Beta_AllTypesObject::Enum::one);
        REQUIRE(specificAllTypeObjects.binaryDataName == std::vector<uint8_t>{0,1,2});
        REQUIRE(specificAllTypeObjects.dateName == date);
        REQUIRE(specificAllTypeObjects.decimal128Name == decimal);
        REQUIRE(specificAllTypeObjects.uuidName == uuid);
        REQUIRE(specificAllTypeObjects.objectIdName == objectId);
        REQUIRE(*specificAllTypeObjects.mixedName == realm::mixed("mixed data"));
        REQUIRE(specificAllTypeObjects.mapName["foo"] == "bar");
        REQUIRE(specificAllTypeObjects.listTypeName[0] == "bar");

        auto it = specificAllTypeObjects.setTypeName.find("Lita");
        REQUIRE(it != specificAllTypeObjects.setTypeName.end());
        REQUIRE(*it == "Lita");

        realm.write([&] {
            realm.remove(specificAllTypeObjects);
        });
        auto allTypeObjectsAfterDeletingSpecificObject = realm.objects<Beta_AllTypesObject>();
        REQUIRE(allTypeObjectsAfterDeletingSpecificObject.size() == 0);
    }
    
    SECTION("Optional supported types", "[model][write]") {
        auto realm = db(std::move(config));
        auto date = std::chrono::time_point<std::chrono::system_clock>();
        auto uuid = realm::uuid();
        auto objectId = realm::object_id::generate();
        auto decimal = realm::decimal128(123.456);
        auto decimal2 = realm::decimal128(789.012);
        
        auto allRequiredAndOptionalTypesObject = Beta_AllTypesObject {
            .boolName = true,
            .intName = 1,
            .doubleName = 1.1,
            .stringName = "Fluffy",
            .enumName = Beta_AllTypesObject::Enum::one,
            .binaryDataName = std::vector<uint8_t>{0,1,2},
            .dateName = date,
            .decimal128Name = decimal,
            .uuidName = uuid,
            .objectIdName = objectId,
            .mixedName = realm::mixed("mixed data"),
            .mapName = std::map<std::string, std::string>({{"foo", "bar"}}),
            .listTypeName = std::vector<std::string>({"bar", "baz"}),
            .optBoolName = false,
            .optIntName = 42,
            .optDoubleName = 42.42,
            .optStringName = "Maui",
            .optEnumName = Beta_AllTypesObject::Enum::two,
            .optDecimal128Name = decimal2,
            .optUuidName = uuid,
            .optObjectIdName = objectId,
            .optBinaryDataName = std::vector<uint8_t>{3,4,5},
            .optDateName = date
        };

        realm.write([&] {
            realm.add(std::move(allRequiredAndOptionalTypesObject));
        });

        auto allTypeObjects = realm.objects<Beta_AllTypesObject>();
        auto specificAllTypeObjects = allTypeObjects[0];
        REQUIRE(specificAllTypeObjects.boolName == true);
        REQUIRE(specificAllTypeObjects.intName == 1);
        REQUIRE(specificAllTypeObjects.doubleName == 1.1);
        REQUIRE(specificAllTypeObjects.stringName == "Fluffy");
        REQUIRE(*specificAllTypeObjects.enumName == Beta_AllTypesObject::Enum::one);
        REQUIRE(specificAllTypeObjects.binaryDataName == std::vector<uint8_t>{0,1,2});
        REQUIRE(specificAllTypeObjects.dateName == date);
        REQUIRE(specificAllTypeObjects.decimal128Name == decimal);
        REQUIRE(specificAllTypeObjects.uuidName == uuid);
        REQUIRE(specificAllTypeObjects.objectIdName == objectId);
        REQUIRE(*specificAllTypeObjects.mixedName == realm::mixed("mixed data"));
        REQUIRE(specificAllTypeObjects.mapName["foo"] == "bar");
        REQUIRE(specificAllTypeObjects.listTypeName[0] == "bar");
        REQUIRE(specificAllTypeObjects.optBoolName == false);
        REQUIRE(*specificAllTypeObjects.optIntName == 42);
        REQUIRE(specificAllTypeObjects.optDoubleName == 42.42);
        REQUIRE(specificAllTypeObjects.optStringName == "Maui");
        REQUIRE(*specificAllTypeObjects.optEnumName == Beta_AllTypesObject::Enum::two);
        REQUIRE(specificAllTypeObjects.optDecimal128Name == decimal2);
        REQUIRE(specificAllTypeObjects.optUuidName == uuid);
        REQUIRE(specificAllTypeObjects.optObjectIdName == objectId);
        REQUIRE(specificAllTypeObjects.optBinaryDataName == std::vector<uint8_t>({3,4,5}));
        REQUIRE(specificAllTypeObjects.optDateName == date);

        realm.write([&] {
            realm.remove(specificAllTypeObjects);
        });
    }
}

TEST_CASE("test string map object", "[model][write]") {
    auto relative_realm_path_directory = "supported_types/";
    std::filesystem::create_directories(relative_realm_path_directory);
    std::filesystem::path path = std::filesystem::current_path().append(relative_realm_path_directory);
    path = path.append("beta_dog_map_objects");
    path = path.replace_extension("realm");
    auto config = realm::db_config();
    config.set_path(path);
    auto realm = db(std::move(config));

    auto dog = Beta_Map_Dog {
        .name = "Maui"
    };

    dog.favoriteParkByCity = {
        { "Boston", "Fort Point" },
        { "New York", "Central Park" }
    };

    SECTION("Test code example functions as intended") {
        realm.write([&] {
            realm.add(std::move(dog));
        });

        auto dogs = realm.objects<Beta_Map_Dog>();
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
        realm.write([&] {
            maui.favoriteParkByCity["New York"] = "Some other park";
        });
        CHECK(favoriteNewYorkPark == "Some other park");
        realm.write([&] {
             maui.favoriteParkByCity.erase("New York");
        });
        CHECK(maui.favoriteParkByCity.find("New York") == maui.favoriteParkByCity.end());
        // Clean up after test
        realm.write([&] {
            realm.remove(maui);
        });
    }
}
// :replace-end:

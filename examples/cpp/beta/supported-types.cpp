#include <catch2/catch_test_macros.hpp>
#include <cpprealm/sdk.hpp>
#include <cpprealm/experimental/sdk.hpp>
#include <chrono>
#include <string>
#include <vector>

// :replace-start: {
//   "terms": {
//     "Beta_": ""
//   }
// }

namespace realm::experimental {
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
    };
    REALM_SCHEMA(Beta_AllTypesObject, boolName, optBoolName, intName, optIntName,
        doubleName, optDoubleName, stringName, optStringName, enumName, 
        optEnumName, binaryDataName, optBinaryDataName, dateName, optDateName, 
        uuidName, optUuidName, objectIdName, optObjectIdName, mixedName, 
        mapName, listTypeName
    )

    TEST_CASE("Test supported types", "[write]") {
        auto relative_realm_path_directory = "supported_types/";
        std::filesystem::create_directories(relative_realm_path_directory);
        std::filesystem::path path = std::filesystem::current_path().append(relative_realm_path_directory);
        path = path.append("all_types_objects");
        path = path.replace_extension("realm");
        auto config = db_config();
        config.set_path(path);

        SECTION("Required supported types") {
            auto realm = db(std::move(config));
            auto date = std::chrono::time_point<std::chrono::system_clock>();
            auto uuid = realm::uuid();
            auto objectId = realm::object_id::generate();

            auto allRequiredTypesObject = Beta_AllTypesObject { 
                .boolName = true,
                .intName = 1,
                .doubleName = 1.1,
                .stringName = "Fluffy",
                .enumName = Beta_AllTypesObject::Enum::one,
                .binaryDataName = std::vector<uint8_t>{0,1,2},
                .dateName = date,
                .uuidName = uuid,
                .objectIdName = objectId,
                .mixedName = realm::mixed("mixed data"),
                .mapName = std::map<std::string, std::string>({{"foo", "bar"}}),
                .listTypeName = std::vector<std::string>({"bar", "baz"})
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
            REQUIRE(specificAllTypeObjects.uuidName == uuid);
            REQUIRE(specificAllTypeObjects.objectIdName == objectId);
            REQUIRE(*specificAllTypeObjects.mixedName == realm::mixed("mixed data"));
            REQUIRE(specificAllTypeObjects.mapName["foo"] == "bar");
            REQUIRE(specificAllTypeObjects.listTypeName[0] == "bar");

            realm.write([&] {
                realm.remove(specificAllTypeObjects);
            });
            auto allTypeObjectsAfterDeletingSpecificObject = realm.objects<Beta_AllTypesObject>();
            REQUIRE(allTypeObjectsAfterDeletingSpecificObject.size() == 0);
        }
        
        SECTION("Optional supported types", "[write]") {
            auto realm = db(std::move(config));
            auto date = std::chrono::time_point<std::chrono::system_clock>();
            auto uuid = realm::uuid();
            auto objectId = realm::object_id::generate();
            
            auto allRequiredAndOptionalTypesObject = Beta_AllTypesObject {
                .boolName = true,
                .intName = 1,
                .doubleName = 1.1,
                .stringName = "Fluffy",
                .enumName = Beta_AllTypesObject::Enum::one,
                .binaryDataName = std::vector<uint8_t>{0,1,2},
                .dateName = date,
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
            REQUIRE(specificAllTypeObjects.optUuidName == uuid);
            REQUIRE(specificAllTypeObjects.optObjectIdName == objectId);
            REQUIRE(specificAllTypeObjects.optBinaryDataName == std::vector<uint8_t>({3,4,5}));
            REQUIRE(specificAllTypeObjects.optDateName == date);

            realm.write([&] {
                realm.remove(specificAllTypeObjects);
            });
        }
    }
}
// :replace-end:

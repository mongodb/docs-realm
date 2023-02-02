#include <catch2/catch_test_macros.hpp>
#include <chrono>
#include <string>
#include <vector>
#include "testHelpers.hpp"
#include <cpprealm/sdk.hpp>

struct AllTypesObject : realm::object<AllTypesObject> { 
    using SomeType = std::string;

    enum class Enum {
        one, two
    };

    // :snippet-start: required-bool
    realm::persisted<bool> boolName;
    // :snippet-end:
    // :snippet-start: optional-bool
    realm::persisted<std::optional<bool>> optBoolName;
    // :snippet-end:
    // :snippet-start: required-int
    realm::persisted<int64_t> intName;
    // :snippet-end:
    // :snippet-start: optional-int
    realm::persisted<std::optional<int64_t>> optIntName;
    // :snippet-end:
    // :snippet-start: required-double
    realm::persisted<double> doubleName;
    // :snippet-end:
    // :snippet-start: optional-double
    realm::persisted<std::optional<double>> optDoubleName;
    // :snippet-end:
    // :snippet-start: required-string
    realm::persisted<std::string> stringName;
    // :snippet-end:
    // :snippet-start: optional-string
    realm::persisted<std::optional<std::string>> optStringName;
    // :snippet-end:
    // :snippet-start: required-enum
    realm::persisted<Enum> enumName;
    // :snippet-end:
    // :snippet-start: optional-enum
    realm::persisted<std::optional<Enum>> optEnumName;
    // :snippet-end:
    // :snippet-start: required-binary-data
    realm::persisted<std::vector<std::uint8_t>> binaryDataName;
    // :snippet-end:
    // :snippet-start: optional-binary-data
    // When I try to declare an optional binary from this syntax, I get these two errors:
    // Implicit instantiation of undefined template 'realm::type_info::persisted_type<realm::BinaryData>'
    // Incomplete definition of type 'realm::type_info::persisted_type<realm::BinaryData>'
    // In cpp/cpprealm/persisted.cpp at ln 128
    // realm::persisted<std::optional<std::vector<std::uint8_t>>> optBinaryDataName;
    // :snippet-end:
    // :snippet-start: required-date
    realm::persisted<std::chrono::time_point<std::chrono::system_clock>> dateName;
    // :snippet-end:
    // :snippet-start: optional-date
    realm::persisted<std::optional<std::chrono::time_point<std::chrono::system_clock>>> optDateName;
    // :snippet-end:
    // :snippet-start: required-uuid
    realm::persisted<realm::uuid> uuidName;
    // :snippet-end:
    // :snippet-start: optional-uuid
    realm::persisted<std::optional<realm::uuid>> optUuidName;
    // :snippet-end:
    // :snippet-start: required-object-id
    realm::persisted<realm::object_id> objectIdName;
    // :snippet-end:
    // :snippet-start: optional-object-id
    realm::persisted<std::optional<realm::object_id>> optObjectIdName;
    // :snippet-end:
    // :snippet-start: required-mixed-type
    realm::persisted<realm::mixed> mixedName;
    // :snippet-end:
    // :snippet-start: required-list
    realm::persisted<std::vector<SomeType>> listTypeName;
    // :snippet-end:

    static constexpr auto schema = realm::schema("AllTypesObject",
        realm::property<&AllTypesObject::boolName>("boolName"),
        realm::property<&AllTypesObject::optBoolName>("optBoolName"),
        realm::property<&AllTypesObject::intName>("intName"),
        realm::property<&AllTypesObject::optIntName>("optIntName"),
        realm::property<&AllTypesObject::doubleName>("doubleName"),
        realm::property<&AllTypesObject::optDoubleName>("optDoubleName"),
        realm::property<&AllTypesObject::stringName>("stringName"),
        realm::property<&AllTypesObject::optStringName>("optStringName"),
        realm::property<&AllTypesObject::enumName>("enumName"),
        realm::property<&AllTypesObject::optEnumName>("optEnumName"),
        realm::property<&AllTypesObject::binaryDataName>("binaryDataName"),
        // realm::property<&AllTypesObject::optBinaryDataName>("optBinaryDataName"),
        realm::property<&AllTypesObject::uuidName>("uuidName"),
        realm::property<&AllTypesObject::optUuidName>("optUuidName"),
        realm::property<&AllTypesObject::mixedName>("mixedName"),
        realm::property<&AllTypesObject::listTypeName>("listTypeName"));
};

#if 0
TEST_CASE("required supported types", "[write]") {

    auto realm = realm::open<AllTypesObject>();

    SECTION("Test code example functions as intended") {
        auto allRequiredTypesObject = AllTypesObject { 
            .boolName = true,
            .intName = 1,
            .doubleName = 1.1,
            .stringName = "Fluffy",
            .enumName = AllTypesObject::Enum::one,
            // The below line causes this test to hang indefinitely running from the terminal, but works in Xcode
            // .binaryDataName = std::vector<uint8_t>{0,1,2},
            .uuidName = realm::uuid(),
            .objectIdName = realm::object_id::generate()
        };

        realm.write([&realm, &allRequiredTypesObject] {
            realm.add(allRequiredTypesObject);
            allRequiredTypesObject.mixedName = "mixed data";
            allRequiredTypesObject.listTypeName.push_back("Rex");
        });

        auto allTypeObjects = realm.objects<AllTypesObject>();
        auto specificAllTypeObjects = allTypeObjects[0];
        REQUIRE(specificAllTypeObjects.boolName == true);
        REQUIRE(specificAllTypeObjects.intName == 1);
        REQUIRE(specificAllTypeObjects.doubleName == 1.1);
        REQUIRE(specificAllTypeObjects.stringName == "Fluffy");
        REQUIRE(specificAllTypeObjects.enumName == AllTypesObject::Enum::one);
        // REQUIRE(specificAllTypeObjects->binaryDataName == std::vector<uint8_t>{0,1,2});
        REQUIRE(specificAllTypeObjects.mixedName == std::string("mixed data"));
        REQUIRE(specificAllTypeObjects.listTypeName[0] == "Rex");
    }
    // Clean up after the test
    removeAll(realm);
}


TEST_CASE("optional supported types", "[write]") {

    auto realm = realm::open<AllTypesObject>();

    SECTION("Test code example functions as intended") {
        auto allRequiredAndOptionalTypesObject = AllTypesObject {
            .boolName = true,
            .intName = 1,
            .doubleName = 1.1,
            .stringName = "Fluffy",
            .enumName = AllTypesObject::Enum::one,
            // The below line causes this test to hang indefinitely running from the terminal, but works in Xcode
            // .binaryDataName = std::vector<uint8_t>{0,1,2},
            .uuidName = realm::uuid(),
            .objectIdName = realm::object_id::generate()
        };

        realm.write([&realm, &allRequiredAndOptionalTypesObject] {
            realm.add(allRequiredAndOptionalTypesObject);
            allRequiredAndOptionalTypesObject.mixedName = "mixed data";
            allRequiredAndOptionalTypesObject.listTypeName.push_back("Rex");
            // Set optional values
            allRequiredAndOptionalTypesObject.optBoolName = false;
            allRequiredAndOptionalTypesObject.optIntName = 42;
            allRequiredAndOptionalTypesObject.optDoubleName = 42.42;
            allRequiredAndOptionalTypesObject.optStringName = "Maui";
            allRequiredAndOptionalTypesObject.optEnumName = AllTypesObject::Enum::two;
            // Currently leaving this commented out due to issue reported in ln 53 above
            // allRequiredAndOptionalTypesObject.optBinaryDataName = std::vector<uint8_t>{3,4,5};
            allRequiredAndOptionalTypesObject.optUuidName = realm::uuid();
            allRequiredAndOptionalTypesObject.optObjectIdName = realm::object_id::generate();
        });

       auto allTypeObjects = realm.objects<AllTypesObject>();
       auto specificAllTypeObjects = allTypeObjects[0];
       REQUIRE(specificAllTypeObjects->boolName == true);
       REQUIRE(specificAllTypeObjects.intName == 1);
       REQUIRE(specificAllTypeObjects->doubleName == 1.1);
       REQUIRE(specificAllTypeObjects.stringName == "Fluffy");
       REQUIRE(specificAllTypeObjects.enumName == AllTypesObject::Enum::one);
       // REQUIRE(specificAllTypeObjects->binaryDataName == std::vector<uint8_t>{0,1,2});
       REQUIRE(specificAllTypeObjects.mixedName == std::string("mixed data"));
       REQUIRE(specificAllTypeObjects.listTypeName[0] == "Rex");
       REQUIRE(specificAllTypeObjects->optBoolName == false);
       REQUIRE(specificAllTypeObjects.optIntName == 42);
       REQUIRE(specificAllTypeObjects->optDoubleName == 42.42);
       REQUIRE(specificAllTypeObjects.optStringName == "Maui");
       REQUIRE(specificAllTypeObjects.optEnumName == AllTypesObject::Enum::two);
        // REQUIRE(specificAllTypeObjects->optBinaryDataName == std::vector<uint8_t>{3,4,5});
    }
    // Clean up after the test
    removeAll(realm);
}
#endif
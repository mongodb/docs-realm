#include <catch2/catch_test_macros.hpp>
#include <cpprealm/sdk.hpp>

static const std::string APP_ID = "cpp-tester-uliix";

// :snippet-start: asymmetric-object
struct WeatherSensorReading : realm::asymmetric_object<WeatherSensorReading> { // :emphasize:
    realm::persisted<realm::object_id> _id{realm::object_id::generate()};
    realm::persisted<std::string> deviceId;
    realm::persisted<double> temperatureInFahrenheit;
    realm::persisted<int64_t> windSpeedInMph;

    static constexpr auto schema = realm::schema("WeatherSensorReading",
        realm::property<&WeatherSensorReading::_id, true>("_id"),
        realm::property<&WeatherSensorReading::deviceId>("deviceId"),
        realm::property<&WeatherSensorReading::temperatureInFahrenheit>("temperatureInFahrenheit"),
        realm::property<&WeatherSensorReading::windSpeedInMph>("windSpeedInMph"));
};
// :snippet-end:

TEST_CASE("create an asymmetric object", "[model][write][sync]") {
    // :snippet-start: connect-and-authenticate
    auto app = realm::App(APP_ID);
    auto user = app.login(realm::App::credentials::anonymous()).get_future().get();
    // :snippet-end:
    // :snippet-start: open-synced-realm-for-asymmetric-sync
    auto syncConfig = user.flexible_sync_configuration();
    auto asymmetricRealm = realm::async_open<WeatherSensorReading>(syncConfig).get_future().get().resolve();
    // :snippet-end:

    // Doing this for simplicity in testing, but should not be relevant to
    // dev code examples, so hiding it.
    const realm::object_id oid = realm::object_id::generate();
    
    // :snippet-start: create-asymmetric-object
    auto weatherSensorReading = WeatherSensorReading {
        ._id = oid, // :remove:
        .deviceId = "WX1278UIT",
        .temperatureInFahrenheit = 64.7,
        .windSpeedInMph = 7
    };

    asymmetricRealm.write([&asymmetricRealm, &weatherSensorReading] {
        asymmetricRealm.add(weatherSensorReading);
    });
    // :snippet-end:
    sleep(5);
    SECTION("Test code example functions as intended") {
        // Check that the asymmetric data got inserted
        // Because we don't have MongoClient, we have to use a function
        auto getAsymmetricDataResult = user.call_function("getAsymmetricSyncData", realm::bson::BsonArray({realm::bson::BsonDocument{{"_id", oid.to_string()}}})).get_future().get();
        CHECK(getAsymmetricDataResult);
        auto asymmetricDataBsonArray = realm::bson::BsonArray (*getAsymmetricDataResult);
        CHECK(asymmetricDataBsonArray.size() == 1);
        CHECK(realm::bson::BsonDocument(asymmetricDataBsonArray[0])["_id"].operator realm::ObjectId().to_string() == oid.to_string());
        // Delete the asymmetric data to clean up after the test
        auto deleteAsymmetricDataResult = user.call_function("deleteAsymmetricSyncData", realm::bson::BsonArray({realm::bson::BsonDocument{{"_id", oid.to_string()}}})).get_future().get();
        CHECK(deleteAsymmetricDataResult);
    }
}

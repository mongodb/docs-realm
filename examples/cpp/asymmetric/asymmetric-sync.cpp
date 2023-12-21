#include <catch2/catch_test_macros.hpp>
#include <cpprealm/sdk.hpp>

// :replace-start: {
//   "terms": {
//     "Beta_": ""
//   }
// }

static const std::string APP_ID = "cpp-tester-uliix";

using namespace realm;

// :snippet-start: beta-asymmetric-object
struct Beta_WeatherSensorReading {
  primary_key<realm::object_id> _id{realm::object_id::generate()};
  std::string deviceId;
  double temperatureInFahrenheit;
  int64_t windSpeedInMph;
};
REALM_ASYMMETRIC_SCHEMA(Beta_WeatherSensorReading, _id, deviceId,
                        temperatureInFahrenheit, windSpeedInMph)
// :snippet-end:

TEST_CASE("Beta asymmetric object example", "[write][sync]") {
  // :snippet-start: beta-connect-and-authenticate
  auto app = realm::App(APP_ID);
  auto user = app.login(realm::App::credentials::anonymous()).get();
  // :snippet-end:
  // :snippet-start: beta-open-asymmetric-synced-realm
  auto syncConfig = user.flexible_sync_configuration();
  auto realm = open<Beta_WeatherSensorReading>(syncConfig);
  // :snippet-end:

  // Doing this for simplicity in testing, but should not be relevant to
  // dev code examples, so hiding it.
  const realm::object_id oid = realm::object_id::generate();

  // :snippet-start: beta-create-asymmetric-object
  auto weatherSensorReading =
      Beta_WeatherSensorReading{._id = oid,  // :remove:
                                .deviceId = "WX1278UIT",
                                .temperatureInFahrenheit = 64.7,
                                .windSpeedInMph = 7};

  realm.write([&] { realm.add(std::move(weatherSensorReading)); });
  // :snippet-end:
  sleep(5);

// This test is currently commented out because the SDK has removed the
// exposed Core headers that gave it access to a BSON library.
// See PR https://github.com/realm/realm-cpp/pull/123/
// Per Lee, a separate project will create a C++ SDK BSON library, but in
// the meantime, I'll need to use some other library to make this test work.
// I need to figure out how to create BSON strings in C++ and pass them
// instead of using realm::bson::Bson for the params.
// TODO: Figure out what library to use and how to make this test/example work.
#if 0
  SECTION("Test asymmetric object has persisted") {
    // Check that the asymmetric data got inserted
    // Because we don't have MongoClient, we have to use a function
    auto getAsymmetricDataResult =
        user.call_function("getAsymmetricSyncDataBeta",
                           realm::bson::BsonArray({realm::bson::BsonDocument{
                               {"_id", oid.to_string()}}}))
            .get();
    CHECK(getAsymmetricDataResult);
    auto asymmetricDataBsonArray =
        realm::bson::BsonArray(*getAsymmetricDataResult);
    CHECK(asymmetricDataBsonArray.size() == 1);
    CHECK(realm::bson::BsonDocument(asymmetricDataBsonArray[0])["_id"]
              .
              operator realm::ObjectId()
              .to_string() == oid.to_string());
    // Delete the asymmetric data to clean up after the test
    auto deleteAsymmetricDataResult =
        user.call_function("deleteAsymmetricSyncDataBeta",
                           realm::bson::BsonArray({realm::bson::BsonDocument{
                               {"_id", oid.to_string()}}}))
            .get();
    CHECK(deleteAsymmetricDataResult);
  }
#endif
}
// :replace-end:

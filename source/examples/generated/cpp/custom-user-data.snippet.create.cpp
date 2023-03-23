auto user = app.login(realm::App::credentials::anonymous()).get_future().get();

// Functions take an argument of BsonArray, so initialize the custom data as a BsonDocument
auto customDataBson = realm::bson::BsonDocument({{"userId", user.identifier()}, {"favoriteColor", "gold"}});

// Call an Atlas Function to insert custom data for the user
auto result = user.call_function("updateCustomUserData", { customDataBson }).get_future().get();

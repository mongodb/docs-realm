// Custom function authentication takes a BSON Document with parameters.
// The parameter details vary depending on how you define your custom authentication function.
realm::bson::BsonDocument params = {{ "username", "bob" }};

auto app = realm::App(APP_ID);

auto user = app.login(realm::App::credentials::function(params)).get_future().get();

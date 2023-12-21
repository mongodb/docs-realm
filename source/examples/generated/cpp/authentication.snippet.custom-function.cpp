//     // Custom function authentication takes a BSON Document with parameters.
//     // The parameter details vary depending on how you define your custom
//     authentication function. realm::bson::BsonDocument params = {{
//     "username", "bob" }};

//     auto appConfig = realm::App::configuration();
//     appConfig.app_id = APP_ID;
//     auto app = realm::App(appConfig);

//     auto user = app.login(realm::App::credentials::function(params)).get();

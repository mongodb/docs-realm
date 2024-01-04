auto appConfig = realm::App::configuration();
appConfig.app_id = APP_ID;
auto app = realm::App(appConfig);

// The id_token below is the user's OpenID Connect id_token you got from
// the Google OAuth response
auto user =
    app.login(realm::App::credentials::google_id_token(myIdToken)).get();

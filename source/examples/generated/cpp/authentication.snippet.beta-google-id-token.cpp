auto app = realm::App(APP_ID);

// The id_token below is the user's OpenID Connect id_token you got from the Google OAuth response
auto user = app.login(realm::App::credentials::google(idToken)).get();

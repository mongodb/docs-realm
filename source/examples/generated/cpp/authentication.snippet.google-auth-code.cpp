auto app = realm::App(APP_ID);

// The auth_code below is the user's server auth code you got from Google
auto user = app.login(realm::App::credentials::google(authCode)).get_future().get();
